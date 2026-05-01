"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { FEATURED_PRODUCTS } from "@/lib/products";

export function FeaturedProducts() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <section className="px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-deep)] mb-2">
              Pilihan Unggulan
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--color-ink)] text-balance">
              Produk favorit pelanggan
            </h2>
          </div>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent-deep)] hover:gap-2 transition-all"
          >
            Lihat semua produk <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {FEATURED_PRODUCTS.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setActive} />
          ))}
        </div>
      </div>
      <QuickViewModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}
