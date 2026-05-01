import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/cn";

type Props = {
  price: number;
  prefix?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
};

export function PriceTag({ price, prefix, className, size = "md" }: Props) {
  return (
    <div className={cn("flex items-baseline gap-1.5", className)}>
      {prefix && (
        <span className="text-xs text-[var(--color-ink-soft)] font-medium">
          {prefix}
        </span>
      )}
      <span
        className={cn(
          "font-display font-extrabold text-[var(--color-accent-deep)] tabular-nums",
          sizes[size],
        )}
      >
        {formatRupiah(price)}
      </span>
    </div>
  );
}
