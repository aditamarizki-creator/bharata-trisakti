"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { buildGeneralInquiry, waUrl } from "@/lib/wa";
import { useSettings } from "@/lib/settings-context";

export function FinalCTA() {
  const { waNumber } = useSettings();
  return (
    <section className="px-4 py-14">
      <GlassCard
        variant="strong"
        className="max-w-7xl mx-auto p-8 md:p-14 relative overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute -right-24 -top-20 w-96 h-96 rounded-full bg-[var(--color-accent-soft)]/60 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -left-20 -bottom-24 w-80 h-80 rounded-full bg-[var(--color-gold)]/30 blur-3xl"
        />

        <div className="relative max-w-3xl">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[var(--color-ink)] text-balance leading-[1.05]">
            Siap kasih yang terbaik untuk{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-deep)] bg-clip-text text-transparent">
              koi & ikan hias
            </span>{" "}
            kesayangan Anda?
          </h2>
          <p className="mt-4 text-[var(--color-ink-soft)] text-lg max-w-2xl leading-relaxed">
            Pilih dari 50+ produk lintas brand, atau langsung tanya admin untuk
            rekomendasi pakan yang paling cocok untuk ikan Anda.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton
              href="/katalog"
              size="lg"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Mulai Pesan Sekarang
            </LinkButton>
            <LinkButton
              href={waUrl(buildGeneralInquiry(), waNumber)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              iconLeft={<MessageCircle className="w-4 h-4" />}
            >
              Konsultasi Gratis
            </LinkButton>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
