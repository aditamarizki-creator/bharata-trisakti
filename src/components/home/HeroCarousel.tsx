"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  src: string;
  alt: string;
  caption?: string;
};

// TODO ganti dengan foto asli toko / pelanggan / packing supaya trust lebih tinggi.
// Cukup taruh foto di /public/hero/ lalu update array di bawah, contoh:
//   { src: "/hero/packing-1.jpg", alt: "Packing rapi", caption: "..." }
const SLIDES: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1200&q=80",
    alt: "Pelanggan kami se-Indonesia",
    caption: "Dipercaya 1.200+ pehobi koi & ikan hias",
  },
  {
    src: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80",
    alt: "Distributor resmi 7 brand",
    caption: "Distributor resmi: Hiro · Sankoi · Kohaku · STP KAE · PIP",
  },
  {
    src: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=1200&q=80",
    alt: "Pengiriman ke seluruh Indonesia",
    caption: "JNE · POS · J&T Cargo — sampai 1–3 hari",
  },
  {
    src: "https://images.unsplash.com/photo-1517457210348-703079e57d4b?auto=format&fit=crop&w=1200&q=80",
    alt: "Konsultasi pakan dengan admin",
    caption: "Konsultasi gratis tiap order — admin balas cepat di WA",
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80",
    alt: "Stok pakan lengkap",
    caption: "Stok lengkap tiap brand favorit, kemasan original",
  },
];

const INTERVAL_MS = 4500;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Foto pelanggan & pengiriman Bharata Trisakti"
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

      {SLIDES[index].caption && (
        <p className="absolute left-4 right-16 bottom-4 text-white text-sm sm:text-[15px] font-medium drop-shadow-md leading-snug">
          {SLIDES[index].caption}
        </p>
      )}

      <button
        type="button"
        aria-label="Foto sebelumnya"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm text-[var(--color-ink)] hover:bg-white shadow-md transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Foto berikutnya"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm text-[var(--color-ink)] hover:bg-white shadow-md transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute right-3 top-3 flex gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Pindah ke foto ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
