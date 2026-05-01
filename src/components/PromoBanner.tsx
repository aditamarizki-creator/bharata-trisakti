"use client";

import { useEffect, useState } from "react";
import { X, Megaphone } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/lib/settings-context";

const DISMISS_KEY = "bharata-promo-dismissed";

export function PromoBanner() {
  const { promoBanner } = useSettings();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Dismissed sampai banner text berubah (signature simple)
    const stored = localStorage.getItem(DISMISS_KEY);
    if (stored === promoBanner.text) setDismissed(true);
  }, [promoBanner.text]);

  if (!promoBanner.enabled || dismissed) return null;

  const onClose = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(DISMISS_KEY, promoBanner.text);
    }
  };

  const Wrap = promoBanner.href ? Link : "div";
  const wrapProps = promoBanner.href
    ? { href: promoBanner.href, target: promoBanner.href.startsWith("http") ? "_blank" : undefined }
    : {};

  return (
    <div className="relative z-30 bg-gradient-to-r from-[var(--color-accent-deep)] via-[var(--color-accent)] to-[var(--color-accent-deep)] text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
        <Megaphone className="w-4 h-4 shrink-0 opacity-90" />
        {/* @ts-expect-error wrap prop variance */}
        <Wrap
          {...wrapProps}
          className="flex-1 text-xs sm:text-sm text-center font-medium leading-tight hover:underline"
        >
          {promoBanner.text}
        </Wrap>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup banner"
          className="w-7 h-7 grid place-items-center rounded-full hover:bg-white/15 shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
