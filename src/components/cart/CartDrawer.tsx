"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Trash2, X, MessageCircle } from "lucide-react";
import { useCart, cartSelectors } from "@/lib/cart-store";
import { formatRupiah } from "@/lib/format";
import { Button, LinkButton } from "@/components/ui/Button";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { ProductImage } from "@/components/product/ProductImage";
import { buildCartInquiry, openWhatsApp } from "@/lib/wa";
import { useSettings } from "@/lib/settings-context";

export function CartDrawer() {
  const { waNumber } = useSettings();
  const isOpen = useCart((s) => s.isOpen);
  const closeCart = useCart((s) => s.closeCart);
  const items = useCart((s) => s.items);
  const subtotal = useCart(cartSelectors.subtotal);
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.button
            type="button"
            aria-label="Tutup"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[var(--color-ink)]/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="relative w-full max-w-md h-full glass-strong flex flex-col"
            role="dialog"
            aria-label="Keranjang belanja"
          >
            <header className="flex items-center justify-between p-5 border-b border-white/60">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[var(--color-accent-deep)]" />
                <h2 className="font-display font-extrabold text-lg">
                  Keranjang
                </h2>
                <span className="text-xs text-[var(--color-ink-soft)]">
                  ({items.length} item)
                </span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Tutup keranjang"
                className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/70"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full grid place-items-center text-center px-6 py-10">
                  <div>
                    <span className="inline-grid place-items-center w-16 h-16 rounded-2xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] mb-3">
                      <ShoppingBag className="w-7 h-7" />
                    </span>
                    <h3 className="font-display font-bold text-xl">
                      Keranjang masih kosong
                    </h3>
                    <p className="text-sm text-[var(--color-ink-soft)] mt-1">
                      Yuk tambahkan pakan favorit ikan Anda dari katalog.
                    </p>
                    <LinkButton
                      href="/katalog"
                      onClick={closeCart}
                      className="mt-5"
                    >
                      Lihat Katalog
                    </LinkButton>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <article
                    key={`${item.productId}-${item.size}`}
                    className="glass rounded-2xl p-3 flex gap-3"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[var(--color-accent-soft)]/30">
                      <ProductImage
                        brand={item.brand}
                        name={item.name}
                        seed={item.productId}
                        rounded="rounded-none"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--color-accent-deep)] font-bold">
                        {item.brand}
                      </p>
                      <p className="font-semibold text-sm leading-tight line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-[var(--color-ink-soft)] mt-0.5">
                        Kemasan {item.size}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <QtyStepper
                          value={item.qty}
                          onChange={(v) =>
                            updateQty(item.productId, item.size, v)
                          }
                          max={50}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.size)}
                          aria-label="Hapus"
                          className="w-8 h-8 grid place-items-center rounded-full hover:bg-[#FAE0DD] text-[var(--color-ink-soft)] hover:text-[#9c322a]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-right font-display font-bold text-[var(--color-accent-deep)] mt-1 tabular-nums">
                        {formatRupiah(item.price * item.qty)}
                      </p>
                    </div>
                  </article>
                ))
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-white/60 p-5 space-y-3 bg-white/40">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-ink-soft)]">
                    Subtotal
                  </span>
                  <span className="font-display font-extrabold text-xl text-[var(--color-accent-deep)] tabular-nums">
                    {formatRupiah(subtotal)}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--color-ink-soft)] -mt-1">
                  Tinggal kirim ke admin via WhatsApp — ongkir & ketersediaan
                  stok dikonfirmasi langsung.
                </p>
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    openWhatsApp(buildCartInquiry(items), waNumber);
                    closeCart();
                  }}
                  iconLeft={<MessageCircle className="w-4 h-4" />}
                >
                  Pesan via WhatsApp
                </Button>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
