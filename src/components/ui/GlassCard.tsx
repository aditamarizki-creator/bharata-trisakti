import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "strong" | "tint" | "dark";
  as?: "div" | "section" | "article" | "aside";
};

export function GlassCard({
  variant = "default",
  className,
  children,
  as: Tag = "div",
  ...rest
}: Props) {
  const variantClass =
    variant === "strong"
      ? "glass-strong"
      : variant === "tint"
        ? "glass-tint"
        : variant === "dark"
          ? "glass-dark"
          : "glass";
  return (
    <Tag
      className={cn(
        variantClass,
        "rounded-[var(--radius-glass,1.25rem)]",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
