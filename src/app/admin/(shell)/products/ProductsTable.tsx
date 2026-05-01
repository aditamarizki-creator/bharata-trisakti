"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Star,
  Pencil,
  Trash2,
  PackageCheck,
  PackageX,
} from "lucide-react";
import type { Product } from "@/types/product";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button, LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductImage } from "@/components/product/ProductImage";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/cn";

type Props = { initial: Product[] };

export function ProductsTable({ initial }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initial);
  const [q, setQ] = useState("");
  const [pending, startTransition] = useTransition();

  const filtered = products.filter((p) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return (
      p.name.toLowerCase().includes(s) ||
      p.brand.toLowerCase().includes(s)
    );
  });

  async function patchProduct(id: string, patch: Partial<Product>) {
    const optimistic = products.map((p) =>
      p.id === id ? { ...p, ...patch } : p,
    );
    setProducts(optimistic);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts((arr) => arr.map((p) => (p.id === id ? data.product : p)));
      toast.success("Tersimpan");
      startTransition(() => router.refresh());
    } catch {
      toast.error("Gagal menyimpan");
      setProducts(initial);
    }
  }

  async function deleteOne(id: string, name: string) {
    if (!confirm(`Hapus produk "${name}"? Tidak bisa di-undo.`)) return;
    const prev = products;
    setProducts((arr) => arr.filter((p) => p.id !== id));
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success("Produk dihapus");
      startTransition(() => router.refresh());
    } catch {
      toast.error("Gagal menghapus");
      setProducts(prev);
    }
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-extrabold text-3xl">Produk</h1>
          <p className="text-[var(--color-ink-soft)] text-sm mt-1">
            {products.length} produk total · {filtered.length} terlihat
          </p>
        </div>
        <LinkButton
          href="/admin/products/new"
          iconLeft={<Plus className="w-4 h-4" />}
        >
          Tambah Produk
        </LinkButton>
      </header>

      <GlassCard className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
          <input
            type="search"
            placeholder="Cari nama atau brand..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 text-sm"
          />
        </div>
      </GlassCard>

      <GlassCard className="p-2 sm:p-3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-[var(--color-ink-soft)] border-b border-white/60">
                <th className="text-left p-3 font-medium">Produk</th>
                <th className="text-left p-3 font-medium">Brand</th>
                <th className="text-left p-3 font-medium">Harga mulai</th>
                <th className="text-center p-3 font-medium">Stok</th>
                <th className="text-center p-3 font-medium">Featured</th>
                <th className="text-right p-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/60">
              {filtered.map((p) => {
                const minPrice = Math.min(...p.variants.map((v) => v.price));
                const inStock = p.inStock !== false;
                return (
                  <tr key={p.id} className="hover:bg-white/40">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[var(--color-accent-soft)]/30">
                          {p.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.imageUrl}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : (
                            <ProductImage
                              brand={p.brand}
                              name={p.name}
                              seed={p.id}
                              rounded="rounded-none"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-bold leading-tight line-clamp-1">
                            {p.name}
                          </p>
                          <p className="text-xs text-[var(--color-ink-soft)] line-clamp-1">
                            {p.fishType.join(", ")} · {p.purpose.join(", ")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="accent">{p.brand}</Badge>
                    </td>
                    <td className="p-3 font-semibold tabular-nums">
                      {formatRupiah(minPrice)}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => patchProduct(p.id, { inStock: !inStock })}
                        disabled={pending}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition border",
                          inStock
                            ? "bg-[#D6EFDD] text-[#1f6b3f] border-[#B5DDC2] hover:bg-[#C2E5CC]"
                            : "bg-[#FAE0DD] text-[#9c322a] border-[#EFC1BC] hover:bg-[#F2CDC8]",
                        )}
                        title="Klik untuk toggle stok"
                      >
                        {inStock ? (
                          <>
                            <PackageCheck className="w-3 h-3" />
                            Tersedia
                          </>
                        ) : (
                          <>
                            <PackageX className="w-3 h-3" />
                            Habis
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => patchProduct(p.id, { featured: !p.featured })}
                        disabled={pending}
                        aria-label={p.featured ? "Unfeature" : "Mark featured"}
                        className={cn(
                          "w-8 h-8 grid place-items-center rounded-full transition",
                          p.featured
                            ? "text-[var(--color-gold)]"
                            : "text-[var(--color-ink-soft)]/40 hover:text-[var(--color-gold)]",
                        )}
                      >
                        <Star
                          className={cn(
                            "w-4 h-4",
                            p.featured && "fill-[var(--color-gold)]",
                          )}
                        />
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="w-8 h-8 grid place-items-center rounded-full hover:bg-white/70 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => deleteOne(p.id, p.name)}
                          className="w-8 h-8 grid place-items-center rounded-full hover:bg-[#FAE0DD] text-[var(--color-ink-soft)] hover:text-[#9c322a]"
                          aria-label="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center">
                    <p className="text-[var(--color-ink-soft)] text-sm">
                      Tidak ada produk yang cocok dengan pencarian.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
