import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  withWordmark?: boolean;
};

export function Logo({ className, withWordmark = true }: Props) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="relative w-10 h-10 rounded-xl grid place-items-center bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] text-white shadow-[0_8px_20px_rgba(14,124,134,0.35)]"
      >
        {/* abstract koi/wave mark */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M3 12c2.5-3 5.5-3 8 0s5.5 3 8 0" />
          <path d="M3 17c2.5-3 5.5-3 8 0s5.5 3 8 0" opacity={0.7} />
          <circle cx="17" cy="9.5" r="0.8" fill="currentColor" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--color-gold)]" />
      </span>
      {withWordmark && (
        <span className="flex flex-col leading-tight">
          <span className="font-display font-extrabold text-[var(--color-ink)] tracking-tight text-base sm:text-lg">
            Bharata Trisakti
          </span>
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
            Premium Fish Food
          </span>
        </span>
      )}
    </div>
  );
}
