import { NextRequest, NextResponse } from "next/server";
import {
  appointmentRequestSchema,
  getFieldErrors
} from "@/lib/appointment-schema";
import { sendAppointmentEmails } from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MIN_FORM_TIME_MS = 3000;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt < now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return current.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 10_000) {
      return NextResponse.json(
        { ok: false, message: "Request is too large." },
        { status: 413 }
      );
    }

    const payload = await request.json().catch(() => null);
    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { ok: false, message: "Invalid appointment request." },
        { status: 400 }
      );
    }

    const rawPayload = payload as Record<string, unknown>;

    if (typeof rawPayload.website === "string" && rawPayload.website.trim()) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Too many appointment attempts. Please wait a few minutes or call the clinic."
        },
        { status: 429 }
      );
    }

    const parsed = appointmentRequestSchema.safeParse(rawPayload);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please check the highlighted fields.",
          errors: getFieldErrors(parsed.error)
        },
        { status: 400 }
      );
    }

    const formAge = Date.now() - parsed.data.formStartedAt;
    if (formAge < MIN_FORM_TIME_MS) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please take a moment to complete the form before submitting."
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        treatment: parsed.data.treatment,
        preferred_date: parsed.data.preferredDate,
        message: parsed.data.message || null,
        source: "website",
        ip_address: ip,
        user_agent: request.headers.get("user-agent")
      })
      .select(
        "id,name,phone,email,treatment,preferred_date,message,email_status,created_at"
      )
      .single();

    if (error || !appointment) {
      console.error("Supabase appointment insert failed", error);
      return NextResponse.json(
        {
          ok: false,
          message:
            "We could not save your appointment request. Please call the clinic directly."
        },
        { status: 500 }
      );
    }

    let emailStatus: "sent" | "failed" = "sent";
    let emailError: string | null = null;

    try {
      await sendAppointmentEmails(appointment);
    } catch (error) {
      emailStatus = "failed";
      emailError =
        error instanceof Error ? error.message : "Unknown email delivery error";
      console.error("Appointment email delivery failed", error);
    }

    await supabase
      .from("appointments")
      .update({
        email_status: emailStatus,
        email_error: emailError
      })
      .eq("id", appointment.id);

    return NextResponse.json(
      {
        ok: true,
        appointmentId: appointment.id,
        emailStatus
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Appointment route failed", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Something went wrong while booking your appointment. Please try again."
      },
      { status: 500 }
    );
  }
}
