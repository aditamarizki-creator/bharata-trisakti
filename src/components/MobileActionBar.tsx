"use client";

import { ShoppingBag, MessageCircle } from "lucide-react";
import { useCart, cartSelectors } from "@/lib/cart-store";
import { formatRupiah } from "@/lib/format";
import { buildCartInquiry, buildGeneralInquiry, waUrl } from "@/lib/wa";
import { useSettings } from "@/lib/settings-context";

export function MobileActionBar() {
  const { waNumber } = useSettings();
  const count = useCart(cartSelectors.count);
  const subtotal = useCart(cartSelectors.subtotal);
  const hydrated = useCart((s) => s.hasHydrated);
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.openCart);

  const hasItems = hydrated && count > 0;
  const waHref = hasItems
    ? waUrl(buildCartInquiry(items), waNumber)
    : waUrl(buildGeneralInquiry(), waNumber);

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 px-3 pb-[max(env(safe-area-inset-bottom,0.5rem),0.5rem)] pt-2"
      aria-label="Aksi cepat"
    >
      <div className="glass-strong rounded-full p-1.5 flex items-center gap-1.5 shadow-[0_-8px_28px_rgba(15,41,46,0.18)]">
        <button
          type="button"
          onClick={openCart}
          aria-label={hasItems ? `Buka keranjang, ${count} item` : "Lihat keranjang"}
          className="shrink-0 relative grid place-items-center w-12 h-12 rounded-full bg-white/70 text-[var(--color-accent-deep)] active:scale-95 transition"
        >
          <ShoppingBag className="w-5 h-5" />
          {hasItems && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-gold)] text-[var(--color-ink)] text-[10px] font-bold grid place-items-center">
              {count}
            </span>
          )}
        </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-between px-4 h-12 rounded-full bg-[var(--color-whatsapp)] text-white shadow-[0_6px_18px_rgba(37,211,102,0.4)] active:scale-[0.98] transition"
          aria-label={hasItems ? "Pesan via WhatsApp" : "Tanya via WhatsApp"}
        >
          <span className="flex items-center gap-2 font-semibold text-sm">
            <MessageCircle className="w-5 h-5" />
            {hasItems ? "Pesan via WA" : "Tanya via WA"}
          </span>
          {hasItems ? (
            <span className="font-display font-extrabold text-sm tabular-nums">
              {formatRupiah(subtotal)}
            </span>
          ) : (
            <span className="text-xs opacity-90">Konsultasi gratis →</span>
          )}
        </a>
      </div>
    </div>
  );
}
