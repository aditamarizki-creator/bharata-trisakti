"use client";

import { Search, X } from "lucide-react";
import type { Brand, FishType, Purpose, Size } from "@/types/product";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { BRANDS } from "@/lib/products";
import { cn } from "@/lib/cn";

export type Filters = {
  q: string;
  brands: Brand[];
  fishType: FishType | "all";
  purposes: Purpose[];
  sizes: Size[];
};

export const EMPTY_FILTERS: Filters = {
  q: "",
  brands: [],
  fishType: "all",
  purposes: [],
  sizes: [],
};

const PURPOSES: { id: Purpose; label: string }[] = [
  { id: "color", label: "Color Enhancer" },
  { id: "growth", label: "Growth" },
  { id: "daily", label: "Daily Feeding" },
  { id: "protein", label: "Hi-Protein" },
];

const SIZES: Size[] = ["1kg", "5kg", "10kg", "20kg"];

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
  total: number;
};

export function ProductFilter({ filters, onChange, total }: Props) {
  const toggleBrand = (b: Brand) =>
    onChange({
      ...filters,
      brands: filters.brands.includes(b)
        ? filters.brands.filter((x) => x !== b)
        : [...filters.brands, b],
    });

  const togglePurpose = (p: Purpose) =>
    onChange({
      ...filters,
      purposes: filters.purposes.includes(p)
        ? filters.purposes.filter((x) => x !== p)
        : [...filters.purposes, p],
    });

  const toggleSize = (s: Size) =>
    onChange({
      ...filters,
      sizes: filters.sizes.includes(s)
        ? filters.sizes.filter((x) => x !== s)
        : [...filters.sizes, s],
    });

  const reset = () => onChange(EMPTY_FILTERS);
  const hasActive =
    filters.q ||
    filters.brands.length ||
    filters.fishType !== "all" ||
    filters.purposes.length ||
    filters.sizes.length;

  return (
    <GlassCard className="p-5 space-y-5 sticky top-24">
      <div>
        <label className="block text-sm font-medium mb-1.5">Cari produk</label>
        <span className="relative block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
          <input
            type="search"
            placeholder="Brand, jenis pakan…"
            value={filters.q}
            onChange={(e) => onChange({ ...filters, q: e.target.value })}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 text-sm"
          />
        </span>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">
          Jenis ikan
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: "all" as const, label: "Semua" },
            { id: "koi" as const, label: "Koi" },
            { id: "hias" as const, label: "Hias" },
          ].map((o) => {
            const active = filters.fishType === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => onChange({ ...filters, fishType: o.id })}
                className={cn(
                  "py-2 rounded-xl text-xs font-semibold border transition",
                  active
                    ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                    : "bg-white/60 border-white/80 text-[var(--color-ink-soft)] hover:bg-white/90",
                )}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">
          Brand
        </p>
        <div className="flex flex-wrap gap-1.5">
          {BRANDS.map((b) => {
            const active = filters.brands.includes(b);
            return (
              <button
                key={b}
                type="button"
                onClick={() => toggleBrand(b)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium border transition",
                  active
                    ? "bg-[var(--color-accent-deep)] text-white border-[var(--color-accent-deep)]"
                    : "bg-white/60 border-white/80 text-[var(--color-ink)] hover:bg-white/90",
                )}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">
          Tujuan
        </p>
        <div className="flex flex-wrap gap-1.5">
          {PURPOSES.map((p) => {
            const active = filters.purposes.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => togglePurpose(p.id)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium border transition",
                  active
                    ? "bg-[var(--color-accent-deep)] text-white border-[var(--color-accent-deep)]"
                    : "bg-white/60 border-white/80 text-[var(--color-ink)] hover:bg-white/90",
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">
          Ukuran tersedia
        </p>
        <div className="grid grid-cols-4 gap-1.5">
          {SIZES.map((s) => {
            const active = filters.sizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleSize(s)}
                className={cn(
                  "py-1.5 rounded-lg text-xs font-semibold border transition",
                  active
                    ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                    : "bg-white/60 border-white/80 text-[var(--color-ink)] hover:bg-white/90",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/60">
        <Badge variant="neutral">{total} produk</Badge>
        {hasActive && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent-deep)] hover:underline"
          >
            <X className="w-3 h-3" /> Reset filter
          </button>
        )}
      </div>
    </GlassCard>
  );
}
