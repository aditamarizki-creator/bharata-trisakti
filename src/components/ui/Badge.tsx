import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Variant = "neutral" | "accent" | "gold" | "success" | "danger";

const styles: Record<Variant, string> = {
  neutral:
    "bg-white/70 text-[var(--color-ink-soft)] border border-white/80",
  accent:
    "bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] border border-[var(--color-accent-soft)]",
  gold:
    "bg-[#F5E9C8] text-[#7a5f1c] border border-[#E5D199]",
  success:
    "bg-[#D6EFDD] text-[#1f6b3f] border border-[#B5DDC2]",
  danger:
    "bg-[#FAE0DD] text-[#9c322a] border border-[#EFC1BC]",
};

export function Badge({
  className,
  variant = "neutral",
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight",
        styles[variant],
        className,
      )}
      {...rest}
    />
  );
}
