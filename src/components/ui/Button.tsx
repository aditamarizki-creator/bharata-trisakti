import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-deep)] shadow-[0_8px_24px_rgba(14,124,134,0.35)]",
  secondary:
    "glass-strong text-[var(--color-ink)] hover:bg-white/90",
  ghost:
    "text-[var(--color-ink)] hover:bg-white/60",
  whatsapp:
    "bg-[var(--color-whatsapp)] text-white hover:bg-[var(--color-whatsapp-deep)] shadow-[0_8px_24px_rgba(37,211,102,0.4)]",
  outline:
    "border border-[var(--color-accent)] text-[var(--color-accent-deep)] hover:bg-[var(--color-accent-soft)]/40",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-13 px-8 text-base font-semibold py-3",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export function LinkButton({
  className,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </a>
  );
}
