"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { ShoppingBag, X, MessageCircle, Fish, Sparkles } from "lucide-react";
import type { Product, Size } from "@/types/product";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { PriceTag } from "./PriceTag";
import { ProductImage } from "./ProductImage";
import { useCart } from "@/lib/cart-store";
import { buildProductInquiry, openWhatsApp } from "@/lib/wa";
import { cn } from "@/lib/cn";

type Props = {
  product: Product | null;
  onClose: () => void;
};

const PURPOSE_LABEL: Record<string, string> = {
  color: "Color Enhancer",
  growth: "Growth",
  daily: "Daily Feeding",
  protein: "Hi-Protein",
};

export function QuickViewModal({ product, onClose }: Props) {
  const [size, setSize] = useState<Size>("1kg");
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  useEffect(() => {
    if (product) {
      setSize(product.variants[0].size);
      setQty(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const variant = product.variants.find((v) => v.size === size) ?? product.variants[0];

  const handleAdd = () => {
    addItem({
      productId: product.id,
      brand: product.brand,
      name: product.name,
      size: variant.size,
      price: variant.price,
      qty,
      image: product.image,
    });
    toast.success(`Ditambahkan: ${product.brand} ${product.name} (${variant.size}) x${qty}`);
    onClose();
    setTimeout(() => openCart(), 250);
  };

  const handleWA = () => {
    openWhatsApp(
      buildProductInquiry(`${product.brand} ${product.name} - ${variant.size} x${qty}`),
    );
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="absolute inset-0 bg-[var(--color-ink)]/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="relative w-full md:max-w-4xl max-h-[92dvh] overflow-y-auto"
          >
            <GlassCard
              variant="strong"
              className="rounded-t-3xl md:rounded-3xl rounded-b-none md:rounded-b-3xl p-0 overflow-hidden"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup detail"
                className="absolute top-3 right-3 z-10 w-10 h-10 grid place-items-center rounded-full glass-strong hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto md:min-h-[480px] bg-[var(--color-accent-soft)]/30">
                  <ProductImage
                    brand={product.brand}
                    name={product.name}
                    seed={product.id}
                    rounded="rounded-none"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {product.badge && (
                      <Badge variant="gold">{product.badge}</Badge>
                    )}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <Badge variant="accent">{product.brand}</Badge>
                    {product.fishType.map((f) => (
                      <Badge key={f} variant="neutral">
                        <Fish className="w-3 h-3" />
                        {f === "koi" ? "Koi" : "Ikan Hias"}
                      </Badge>
                    ))}
                    {product.purpose.map((p) => (
                      <Badge key={p} variant="neutral">
                        <Sparkles className="w-3 h-3" />
                        {PURPOSE_LABEL[p]}
                      </Badge>
                    ))}
                  </div>

                  <h2 className="font-display font-extrabold text-[var(--color-ink)] text-2xl md:text-3xl text-balance leading-tight">
                    {product.name}
                  </h2>
                  <p className="mt-3 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">
                      Pilih kemasan
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {product.variants.map((v) => {
                        const active = v.size === size;
                        return (
                          <button
                            key={v.size}
                            type="button"
                            onClick={() => setSize(v.size)}
                            className={cn(
                              "px-3 py-2.5 rounded-xl border text-sm transition text-left",
                              active
                                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-[0_4px_12px_rgba(14,124,134,0.3)]"
                                : "bg-white/70 border-white/80 hover:border-[var(--color-accent-soft)] text-[var(--color-ink)]",
                            )}
                          >
                            <span className="block text-xs opacity-80">
                              {v.size.includes("kg") && parseInt(v.size) <= 5
                                ? "Repack"
                                : "Sak"}
                            </span>
                            <span className="block font-bold">{v.size}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
                    <PriceTag price={variant.price * qty} size="lg" />
                    <QtyStepper value={qty} onChange={setQty} max={50} />
                  </div>

                  <div className="mt-6 flex flex-col gap-2.5">
                    <Button
                      size="lg"
                      onClick={handleAdd}
                      iconLeft={<ShoppingBag className="w-4 h-4" />}
                    >
                      Tambah ke Keranjang
                    </Button>
                    <Button
                      size="md"
                      variant="whatsapp"
                      onClick={handleWA}
                      iconLeft={<MessageCircle className="w-4 h-4" />}
                    >
                      Pesan Langsung via WhatsApp
                    </Button>
                  </div>

                  <p className="text-[11px] text-[var(--color-ink-soft)] text-center mt-3">
                    Ongkir dikonfirmasi admin setelah pesanan dikirim
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
