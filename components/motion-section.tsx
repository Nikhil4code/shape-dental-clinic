"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionSectionProps = HTMLMotionProps<"section"> & {
  children: React.ReactNode;
};

export function MotionSection({
  children,
  className,
  ...props
}: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
