"use client";

import { ShoppingBag, MessageCircle } from "lucide-react";
import { useCart, cartSelectors } from "@/lib/cart-store";
import { formatRupiah } from "@/lib/format";
import { buildGeneralInquiry, waUrl } from "@/lib/wa";

export function MobileActionBar() {
  const count = useCart(cartSelectors.count);
  const subtotal = useCart(cartSelectors.subtotal);
  const hydrated = useCart((s) => s.hasHydrated);
  const openCart = useCart((s) => s.openCart);

  const hasItems = hydrated && count > 0;

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 px-3 pb-[max(env(safe-area-inset-bottom,0.5rem),0.5rem)] pt-2"
      aria-label="Aksi cepat"
    >
      <div className="glass-strong rounded-full p-1.5 flex items-center gap-1.5 shadow-[0_-8px_28px_rgba(15,41,46,0.18)]">
        <a
          href={waUrl(buildGeneralInquiry())}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 grid place-items-center w-12 h-12 rounded-full bg-[var(--color-whatsapp)] text-white shadow-[0_4px_12px_rgba(37,211,102,0.35)] active:scale-95 transition"
          aria-label="Chat WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <button
          type="button"
          onClick={openCart}
          className="flex-1 flex items-center justify-between px-4 h-12 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-deep)] text-white shadow-[0_6px_18px_rgba(14,124,134,0.4)] active:scale-[0.98] transition"
          aria-label={hasItems ? `Buka keranjang, ${count} item` : "Lihat keranjang"}
        >
          <span className="flex items-center gap-2 font-semibold text-sm">
            <span className="relative">
              <ShoppingBag className="w-5 h-5" />
              {hasItems && (
                <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-gold)] text-[var(--color-ink)] text-[10px] font-bold grid place-items-center">
                  {count}
                </span>
              )}
            </span>
            {hasItems ? "Lanjut Pesan" : "Keranjang Kosong"}
          </span>
          {hasItems ? (
            <span className="font-display font-extrabold text-sm tabular-nums">
              {formatRupiah(subtotal)}
            </span>
          ) : (
            <span className="text-xs opacity-90">Lihat katalog →</span>
          )}
        </button>
      </div>
    </div>
  );
}
