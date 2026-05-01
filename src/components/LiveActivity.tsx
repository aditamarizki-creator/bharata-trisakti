"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, MapPin } from "lucide-react";

type Activity = {
  name: string;
  city: string;
  product: string;
  ago: string;
};

const ACTIVITIES: Activity[] = [
  { name: "Budi", city: "Surabaya", product: "Hiro Color Up 5kg", ago: "3 menit lalu" },
  { name: "Sari", city: "Jakarta", product: "Sankoi Color Boost 1kg", ago: "8 menit lalu" },
  { name: "Pak Eko", city: "Bandung", product: "Kohaku Show Quality 20kg", ago: "12 menit lalu" },
  { name: "Andi", city: "Yogyakarta", product: "STP KAE Daily 10kg", ago: "18 menit lalu" },
  { name: "Rina", city: "Medan", product: "PIP Hias Premium 1kg", ago: "23 menit lalu" },
  { name: "Wawan", city: "Semarang", product: "Hiro Growth Pro 5kg", ago: "31 menit lalu" },
  { name: "Bu Lina", city: "Bali", product: "CP Petindo Color 10kg", ago: "42 menit lalu" },
  { name: "Pak Joko", city: "Malang", product: "Matahari Sakti Floating 20kg", ago: "1 jam lalu" },
  { name: "Dewi", city: "Bekasi", product: "Kohaku Color Premium 5kg", ago: "1 jam lalu" },
  { name: "Faisal", city: "Palembang", product: "Hiro Champion Mix 10kg", ago: "2 jam lalu" },
];

export function LiveActivity() {
  const [idx, setIdx] = useState(0);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // muncul setelah 2 detik (biar tidak overwhelming saat first paint)
    const showTimer = setTimeout(() => setHidden(false), 2000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (hidden) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % ACTIVITIES.length);
    }, 4500);
    return () => clearInterval(t);
  }, [hidden]);

  if (hidden) return null;

  const a = ACTIVITIES[idx];

  return (
    <div
      className="fixed bottom-24 left-3 sm:bottom-5 sm:left-5 z-30 pointer-events-none max-w-[88vw] sm:max-w-xs"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="glass-strong rounded-2xl px-3.5 py-2.5 flex items-center gap-3 shadow-[0_12px_32px_rgba(15,41,46,0.18)]"
        >
          <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-[var(--color-accent-soft)]/70 text-[var(--color-accent-deep)] shrink-0">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--color-success)] ring-2 ring-white">
              <span className="absolute inset-0 rounded-full bg-[var(--color-success)] animate-ping opacity-70" />
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] sm:text-[13px] leading-tight">
              <strong className="font-display font-bold">{a.name}</strong>
              <span className="text-[var(--color-ink-soft)]"> dari </span>
              <span className="inline-flex items-center gap-0.5 align-middle">
                <MapPin className="w-3 h-3 text-[var(--color-accent)]" />
                <strong>{a.city}</strong>
              </span>
            </p>
            <p className="text-[11px] sm:text-[12px] text-[var(--color-ink-soft)] leading-tight truncate">
              pesan {a.product}
            </p>
            <p className="text-[10px] text-[var(--color-accent-deep)] font-semibold mt-0.5">
              ✓ {a.ago}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
