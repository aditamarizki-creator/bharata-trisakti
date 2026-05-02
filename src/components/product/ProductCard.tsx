"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/Badge";
import { ProductImage } from "./ProductImage";
import { getMinPrice } from "@/lib/products";
import { formatRupiah } from "@/lib/format";
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
    <article
      className={cn(
        "product-card group rounded-3xl overflow-hidden flex flex-col",
        outOfStock && "opacity-70",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => !outOfStock && onQuickView(product)}
        disabled={outOfStock}
        aria-label={`Lihat detail ${product.name}`}
        className={cn(
          "relative aspect-square w-full overflow-hidden bg-[var(--color-accent-soft)]/30",
          outOfStock && "cursor-not-allowed",
        )}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-[1.06]",
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
              "transition-transform duration-500 group-hover:scale-[1.06]",
              outOfStock && "grayscale",
            )}
          />
        )}

        {/* gradient bottom for badge legibility */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgba(42,38,34,0.35)] to-transparent pointer-events-none"
        />

        {/* top-left brand chip */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-sm">
          {product.brand}
        </span>

        {/* top-right badge */}
        {product.badge && !outOfStock && (
          <span className="absolute top-3 right-3">
            <Badge variant={badgeVariant[product.badge]}>{product.badge}</Badge>
          </span>
        )}

        {outOfStock && (
          <span className="absolute inset-0 grid place-items-center bg-[var(--color-ink)]/30 backdrop-blur-[2px]">
            <span className="bg-white/90 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
              Stok Habis
            </span>
          </span>
        )}
      </button>

      <div className="p-3 sm:p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-display font-bold text-[var(--color-ink)] text-[15px] sm:text-base leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-[var(--color-ink-soft)] line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-2.5 flex items-end justify-between gap-2">
          <div className="flex flex-col leading-none min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-ink-soft)] font-medium">
              Mulai
            </span>
            <span className="font-display font-extrabold text-[var(--color-accent-deep)] tabular-nums text-[14px] sm:text-lg whitespace-nowrap mt-1">
              {formatRupiah(min)}
            </span>
          </div>
          {!outOfStock && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              aria-label={`Pesan ${product.name}`}
              className="shrink-0 grid place-items-center w-9 h-9 sm:w-auto sm:h-9 sm:px-3.5 rounded-full bg-[var(--color-ink)] text-white text-xs font-semibold hover:bg-[var(--color-accent-deep)] transition shadow-[0_4px_14px_rgba(42,38,34,0.18)]"
            >
              <ArrowUpRight className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline-flex items-center gap-1">
                Pesan <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
