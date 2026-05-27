import { Resend } from "resend";
import { clinic, mapDirectionsUrl, siteUrl } from "@/lib/clinic";

type AppointmentEmailPayload = {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatment: string;
  preferred_date: string;
  message: string | null;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatPreferredDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeZone: "Asia/Kolkata"
  }).format(new Date(`${date}T00:00:00+05:30`));
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing Resend API key.");
  }

  return new Resend(apiKey);
}

function getEmailConfig() {
  const from = process.env.RESEND_FROM_EMAIL;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!from || !adminEmail) {
    throw new Error("Missing Resend sender or admin email.");
  }

  return { from, adminEmail };
}

function patientHtml(appointment: AppointmentEmailPayload) {
  const preferredDate = formatPreferredDate(appointment.preferred_date);

  return `
    <div style="font-family: Arial, sans-serif; background:#f8fbff; padding:32px; color:#071936;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #d9ebff; border-radius:20px; overflow:hidden;">
        <div style="background:#1260c5; color:#ffffff; padding:28px 32px;">
          <p style="margin:0; font-size:13px; letter-spacing:2px; text-transform:uppercase;">Appointment Request Received</p>
          <h1 style="margin:10px 0 0; font-size:28px;">${clinic.name}</h1>
        </div>
        <div style="padding:32px;">
          <p>Dear ${escapeHtml(appointment.name)},</p>
          <p>Thank you for requesting an appointment with ${clinic.name}. Our team has received your details and will contact you shortly to confirm the final slot.</p>
          <div style="background:#eef6ff; border-radius:16px; padding:20px; margin:24px 0;">
            <p><strong>Treatment:</strong> ${escapeHtml(appointment.treatment)}</p>
            <p><strong>Preferred date:</strong> ${preferredDate}</p>
            <p><strong>Phone:</strong> ${escapeHtml(appointment.phone)}</p>
          </div>
          <p><strong>Clinic address</strong><br />${clinic.address}</p>
          <p><strong>Working hours:</strong> ${clinic.hours}</p>
          <p>
            <a href="${mapDirectionsUrl}" style="display:inline-block; background:#1260c5; color:#ffffff; padding:12px 18px; border-radius:999px; text-decoration:none;">Get directions</a>
          </p>
          <p style="color:#4d617f; font-size:13px;">If this request was not made by you, please ignore this email or call us at ${clinic.phone}.</p>
        </div>
      </div>
    </div>
  `;
}

function adminHtml(appointment: AppointmentEmailPayload) {
  const preferredDate = formatPreferredDate(appointment.preferred_date);
  const message = appointment.message
    ? escapeHtml(appointment.message)
    : "No message provided.";

  return `
    <div style="font-family: Arial, sans-serif; color:#071936;">
      <h1>New appointment request</h1>
      <p><strong>Lead ID:</strong> ${appointment.id}</p>
      <p><strong>Name:</strong> ${escapeHtml(appointment.name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(appointment.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(appointment.email)}</p>
      <p><strong>Treatment:</strong> ${escapeHtml(appointment.treatment)}</p>
      <p><strong>Preferred date:</strong> ${preferredDate}</p>
      <p><strong>Message:</strong><br />${message}</p>
      <p><strong>Source:</strong> ${siteUrl}</p>
    </div>
  `;
}

function patientText(appointment: AppointmentEmailPayload) {
  return [
    `Thank you for requesting an appointment with ${clinic.name}.`,
    `Treatment: ${appointment.treatment}`,
    `Preferred date: ${formatPreferredDate(appointment.preferred_date)}`,
    `Clinic address: ${clinic.address}`,
    `Working hours: ${clinic.hours}`,
    `Phone: ${clinic.phone}`
  ].join("\n");
}

function adminText(appointment: AppointmentEmailPayload) {
  return [
    "New appointment request",
    `Lead ID: ${appointment.id}`,
    `Name: ${appointment.name}`,
    `Phone: ${appointment.phone}`,
    `Email: ${appointment.email}`,
    `Treatment: ${appointment.treatment}`,
    `Preferred date: ${formatPreferredDate(appointment.preferred_date)}`,
    `Message: ${appointment.message || "No message provided."}`,
    `Source: ${siteUrl}`
  ].join("\n");
}

export async function sendAppointmentEmails(appointment: AppointmentEmailPayload) {
  const resend = getResend();
  const { from, adminEmail } = getEmailConfig();

  await Promise.all([
    resend.emails.send({
      from,
      to: appointment.email,
      subject: `Appointment request received - ${clinic.name}`,
      html: patientHtml(appointment),
      text: patientText(appointment)
    }),
    resend.emails.send({
      from,
      to: adminEmail,
      replyTo: appointment.email,
      subject: `New appointment request: ${appointment.treatment}`,
      html: adminHtml(appointment),
      text: adminText(appointment)
    })
  ]);
}
