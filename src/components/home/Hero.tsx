"use client";

import Link from "next/link";
import { Star, Truck, ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { buildGeneralInquiry, waUrl } from "@/lib/wa";
import { useSettings } from "@/lib/settings-context";
import { HeroCarousel } from "./HeroCarousel";

export function Hero() {
  const { waNumber } = useSettings();
  return (
    <section className="relative px-4 pt-6 sm:pt-10 md:pt-16 pb-10 md:pb-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <Badge variant="accent" className="mb-4 sm:mb-5">
            ★ Dipercaya 1.200+ pehobi koi se-Indonesia
          </Badge>
          <h1 className="font-display font-extrabold text-[var(--color-ink)] text-balance text-[2rem] leading-[1.08] sm:text-5xl lg:text-6xl sm:leading-[1.05] tracking-tight">
            Pakan Premium untuk{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-deep)] bg-clip-text text-transparent">
              Koi & Ikan Hias
            </span>{" "}
            Kesayangan Anda
          </h1>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-lg text-[var(--color-ink-soft)] max-w-xl text-balance leading-relaxed">
            Brand resmi: Hiro, Sankoi, STP KAE, Kohaku, PIP, Matahari Sakti, dan
            CP Petindo. Harga bersaing, kirim ke seluruh Indonesia.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
            <LinkButton
              href="/katalog"
              size="lg"
              iconRight={<ArrowRight className="w-4 h-4" />}
              className="justify-center"
            >
              Lihat Katalog
            </LinkButton>
            <LinkButton
              href={waUrl(buildGeneralInquiry(), waNumber)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="justify-center"
            >
              Tanya via WhatsApp
            </LinkButton>
          </div>

          <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[var(--color-ink-soft)]">
            <span className="inline-flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[var(--color-gold)] fill-[var(--color-gold)]" />
              <strong className="text-[var(--color-ink)]">4.9</strong> rating
              pelanggan
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[var(--color-accent)]" />
              JNE · POS · J&amp;T Cargo
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 relative order-1 lg:order-2">
          <GlassCard className="relative aspect-[5/4] sm:aspect-[4/5] overflow-hidden p-0">
            <HeroCarousel />
          </GlassCard>

          {/* floating stat cards (desktop only) */}
          <GlassCard
            variant="strong"
            className="hidden md:block absolute -left-6 top-10 p-4 w-48"
          >
            <p className="text-[11px] uppercase tracking-wider text-[var(--color-ink-soft)]">
              Stok brand
            </p>
            <p className="font-display font-bold text-2xl text-[var(--color-ink)] mt-1">
              7 Brand
            </p>
            <p className="text-xs text-[var(--color-ink-soft)] mt-0.5">
              Hiro · Sankoi · Kohaku · dll
            </p>
          </GlassCard>
          <GlassCard
            variant="strong"
            className="hidden md:flex absolute -right-4 bottom-6 p-4 w-52 items-center gap-3"
          >
            <span className="grid place-items-center w-10 h-10 rounded-full bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)]">
              <Truck className="w-5 h-5" />
            </span>
            <div>
              <p className="font-display font-bold text-sm text-[var(--color-ink)]">
                Kirim Nasional
              </p>
              <p className="text-[11px] text-[var(--color-ink-soft)]">
                1-3 hari ke seluruh Indonesia
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
      <div className="sr-only">
        <Link href="/katalog">Lihat semua produk</Link>
      </div>
    </section>
  );
}
