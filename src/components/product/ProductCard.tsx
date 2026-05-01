"use client";

import Image from "next/image";
import { Eye, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "./PriceTag";
import { ProductImage } from "./ProductImage";
import { getMinPrice } from "@/lib/products";
import { cn } from "@/lib/cn";

type Props = {
  product: Product;
  onQuickView: (p: Product) => void;
  className?: string;
};

const badgeVariant: Record<NonNullable<Product["badge"]>, "accent" | "gold" | "success" | "danger"> = {
  Premium: "gold",
  Terlaris: "accent",
  Baru: "success",
  Hemat: "danger",
};

export function ProductCard({ product, onQuickView, className }: Props) {
  const min = getMinPrice(product);
  const outOfStock = product.inStock === false;
  return (
    <GlassCard
      className={cn(
        "group p-3 flex flex-col gap-3 hover:translate-y-[-3px] transition-all",
        outOfStock && "opacity-70",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => !outOfStock && onQuickView(product)}
        disabled={outOfStock}
        className={cn(
          "relative aspect-square w-full rounded-2xl overflow-hidden bg-[var(--color-accent-soft)]/30",
          outOfStock && "cursor-not-allowed",
        )}
        aria-label={`Lihat detail ${product.name}`}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className={cn(
              "object-cover group-hover:scale-105 transition-transform duration-500",
              outOfStock && "grayscale",
            )}
          />
        ) : (
          <ProductImage
            brand={product.brand}
            name={product.name}
            seed={product.id}
            rounded="rounded-none"
            className={cn(
              "group-hover:scale-105 transition-transform duration-500",
              outOfStock && "grayscale",
            )}
          />
        )}
        {product.badge && !outOfStock && (
          <span className="absolute top-2 left-2">
            <Badge variant={badgeVariant[product.badge]}>{product.badge}</Badge>
          </span>
        )}
        {outOfStock && (
          <span className="absolute inset-0 grid place-items-center bg-[var(--color-ink)]/30 backdrop-blur-[2px]">
            <span className="glass-strong px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Stok Habis
            </span>
          </span>
        )}
        {!outOfStock && (
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 glass-strong rounded-full px-2.5 py-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
            <Eye className="w-3.5 h-3.5" />
            Detail
          </span>
        )}
      </button>

      <div className="px-1 flex flex-col gap-1.5 flex-1">
        <Badge variant="accent" className="self-start">
          {product.brand}
        </Badge>
        <h3 className="font-display font-bold text-[var(--color-ink)] text-[15px] leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-[var(--color-ink-soft)] line-clamp-2 mt-0.5">
          {product.description}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 px-1 pb-1">
        <PriceTag price={min} prefix="Mulai" size="sm" />
        {outOfStock ? (
          <span className="text-xs text-[var(--color-ink-soft)] font-semibold px-3 py-2">
            Habis
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-[var(--color-accent)] text-white text-xs font-semibold hover:bg-[var(--color-accent-deep)] transition shadow-[0_4px_12px_rgba(14,124,134,0.3)]"
          >
            <Plus className="w-3.5 h-3.5" />
            Pesan
          </button>
        )}
      </div>
    </GlassCard>
  );
}
