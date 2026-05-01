"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/types/product";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilter, EMPTY_FILTERS, type Filters } from "@/components/product/ProductFilter";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export default function KatalogPage() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [active, setActive] = useState<Product | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filters.q) {
        const q = filters.q.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.brand.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.fishType !== "all" && !p.fishType.includes(filters.fishType))
        return false;
      if (
        filters.purposes.length &&
        !filters.purposes.some((pu) => p.purpose.includes(pu))
      )
        return false;
      if (
        filters.sizes.length &&
        !filters.sizes.some((s) => p.variants.some((v) => v.size === s))
      )
        return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 md:mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-deep)] mb-2">
            Katalog
          </p>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-[var(--color-ink)]">
            Semua pakan untuk koi & ikan hias
          </h1>
          <p className="text-[var(--color-ink-soft)] mt-2 max-w-2xl">
            50+ produk dari 7 brand terpercaya. Klik produk untuk lihat detail
            dan pilih kemasan.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="hidden lg:block lg:col-span-3">
            <ProductFilter
              filters={filters}
              onChange={setFilters}
              total={filtered.length}
            />
          </aside>

          <div className="lg:hidden mb-3 flex items-center justify-between">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setMobileOpen(true)}
              iconLeft={<SlidersHorizontal className="w-4 h-4" />}
            >
              Filter
            </Button>
            <span className="text-sm text-[var(--color-ink-soft)]">
              {filtered.length} produk
            </span>
          </div>

          <div className="lg:col-span-9">
            {filtered.length === 0 ? (
              <GlassCard className="p-10 text-center">
                <h3 className="font-display font-bold text-xl">
                  Tidak ada produk yang cocok
                </h3>
                <p className="text-[var(--color-ink-soft)] text-sm mt-2">
                  Coba longgarkan filter atau reset pencarian.
                </p>
                <Button
                  className="mt-5"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                >
                  Reset Filter
                </Button>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onQuickView={setActive}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Tutup filter"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-[var(--color-ink)]/40 backdrop-blur-sm"
          />
          <aside className="absolute right-0 top-0 bottom-0 w-[88%] max-w-sm glass-strong overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold">Filter</h3>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 grid place-items-center rounded-full hover:bg-white/70"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ProductFilter
              filters={filters}
              onChange={setFilters}
              total={filtered.length}
            />
            <Button
              size="lg"
              className="w-full mt-4"
              onClick={() => setMobileOpen(false)}
            >
              Tampilkan {filtered.length} produk
            </Button>
          </aside>
        </div>
      )}

      <QuickViewModal product={active} onClose={() => setActive(null)} />
    </div>
  );
}
