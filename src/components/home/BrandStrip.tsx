import { GlassCard } from "@/components/ui/GlassCard";
import { BRANDS } from "@/lib/products";
import { ShieldCheck } from "lucide-react";

export function BrandStrip() {
  // duplikasi list 2x untuk seamless loop marquee
  const items = [...BRANDS, ...BRANDS];

  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--color-ink-soft)] mb-5 inline-flex items-center justify-center gap-2 w-full">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent)]" />
          Distributor resmi 7 brand pakan terkemuka
        </p>
        <GlassCard className="px-2 py-5 md:py-6 overflow-hidden scroll-fade-mask">
          <div className="flex w-max animate-marquee animate-marquee-pause">
            {items.map((b, i) => (
              <div
                key={`${b}-${i}`}
                className="px-6 md:px-10 shrink-0 text-[var(--color-ink-soft)] hover:text-[var(--color-accent-deep)] transition flex items-center gap-2"
              >
                <span
                  aria-hidden
                  className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] text-white grid place-items-center font-display font-extrabold text-xs"
                >
                  {b[0]}
                </span>
                <span className="font-display font-bold text-sm md:text-base whitespace-nowrap tracking-tight">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
