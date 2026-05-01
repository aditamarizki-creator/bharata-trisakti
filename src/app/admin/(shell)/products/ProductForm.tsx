"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { ArrowLeft, Star, Trash2, Upload, X, Loader2 } from "lucide-react";
import Link from "next/link";
import type {
  Brand,
  FishType,
  Product,
  Purpose,
  Size,
  Variant,
} from "@/types/product";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { ProductImage } from "@/components/product/ProductImage";
import { BRANDS } from "@/lib/products";
import { cn } from "@/lib/cn";

const FISH_OPTIONS: { id: FishType; label: string }[] = [
  { id: "koi", label: "Koi" },
  { id: "hias", label: "Ikan Hias" },
];

const PURPOSE_OPTIONS: { id: Purpose; label: string }[] = [
  { id: "color", label: "Color Enhancer" },
  { id: "growth", label: "Growth" },
  { id: "daily", label: "Daily Feeding" },
  { id: "protein", label: "Hi-Protein" },
];

const SIZES: Size[] = ["1kg", "5kg", "10kg", "20kg"];

const BADGES: Product["badge"][] = ["Terlaris", "Premium", "Baru", "Hemat"];

type Props = {
  initial?: Product;
  mode: "new" | "edit";
};

function emptyProduct(): Product {
  return {
    id: "",
    slug: "",
    brand: "Hiro",
    name: "",
    fishType: ["koi"],
    purpose: ["daily"],
    description: "",
    variants: [
      { size: "1kg", price: 0 },
      { size: "5kg", price: 0 },
      { size: "10kg", price: 0 },
      { size: "20kg", price: 0 },
    ],
    image: "",
    imageUrl: "",
    featured: false,
    inStock: true,
  };
}

export function ProductForm({ initial, mode }: Props) {
  const router = useRouter();
  const [p, setP] = useState<Product>(initial ?? emptyProduct());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function set<K extends keyof Product>(key: K, value: Product[K]) {
    setP((prev) => ({ ...prev, [key]: value }));
  }

  function setVariantPrice(size: Size, price: number) {
    setP((prev) => {
      const found = prev.variants.find((v) => v.size === size);
      const variants: Variant[] = found
        ? prev.variants.map((v) => (v.size === size ? { ...v, price } : v))
        : [...prev.variants, { size, price }];
      return { ...prev, variants };
    });
  }

  function getVariantPrice(size: Size) {
    return p.variants.find((v) => v.size === size)?.price ?? 0;
  }

  function toggleFish(id: FishType) {
    setP((prev) => ({
      ...prev,
      fishType: prev.fishType.includes(id)
        ? prev.fishType.filter((x) => x !== id)
        : [...prev.fishType, id],
    }));
  }

  function togglePurpose(id: Purpose) {
    setP((prev) => ({
      ...prev,
      purpose: prev.purpose.includes(id)
        ? prev.purpose.filter((x) => x !== id)
        : [...prev.purpose, id],
    }));
  }

  async function onUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Maks 4MB");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Upload gagal");
        return;
      }
      set("imageUrl", data.url);
      toast.success("Foto ter-upload");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!p.name.trim()) {
      toast.error("Nama produk wajib");
      return;
    }
    if (p.fishType.length === 0) {
      toast.error("Pilih minimal 1 jenis ikan");
      return;
    }
    setSaving(true);
    try {
      const isEdit = mode === "edit" && p.id;
      const url = isEdit ? `/api/admin/products/${p.id}` : "/api/admin/products";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal menyimpan");
        return;
      }
      toast.success(isEdit ? "Produk diupdate" : "Produk baru ditambahkan");
      router.push("/admin/products");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (mode !== "edit" || !p.id) return;
    if (!confirm(`Hapus "${p.name}"? Tidak bisa di-undo.`)) return;
    setSaving(true);
    const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Gagal menghapus");
      setSaving(false);
      return;
    }
    toast.success("Produk dihapus");
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-accent-deep)]"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl mt-1">
            {mode === "new" ? "Tambah Produk Baru" : "Edit Produk"}
          </h1>
        </div>
        <div className="flex gap-2">
          {mode === "edit" && (
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={onDelete}
              disabled={saving}
              iconLeft={<Trash2 className="w-4 h-4" />}
              className="text-[#9c322a] hover:bg-[#FAE0DD]"
            >
              Hapus
            </Button>
          )}
          <Button type="submit" size="md" disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-5">
        <GlassCard className="lg:col-span-2 p-6 space-y-4">
          <h2 className="font-display font-bold">Informasi Dasar</h2>

          <Input
            label="Nama produk"
            name="name"
            required
            placeholder="contoh: Hiro Color Up"
            value={p.name}
            onChange={(e) => set("name", e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Brand <span className="text-[var(--color-accent)]">*</span>
            </label>
            <select
              value={p.brand}
              onChange={(e) => set("brand", e.target.value as Brand)}
              className="w-full bg-white/70 border border-white/80 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
            >
              {BRANDS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          <Textarea
            label="Deskripsi"
            name="description"
            placeholder="Tulis deskripsi produk..."
            value={p.description}
            onChange={(e) => set("description", e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium mb-2">
              Jenis ikan <span className="text-[var(--color-accent)]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {FISH_OPTIONS.map((o) => {
                const active = p.fishType.includes(o.id);
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => toggleFish(o.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold border transition",
                      active
                        ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                        : "bg-white/60 border-white/80 text-[var(--color-ink)]",
                    )}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tujuan pakan</label>
            <div className="flex flex-wrap gap-2">
              {PURPOSE_OPTIONS.map((o) => {
                const active = p.purpose.includes(o.id);
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => togglePurpose(o.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                      active
                        ? "bg-[var(--color-accent-deep)] text-white border-[var(--color-accent-deep)]"
                        : "bg-white/60 border-white/80 text-[var(--color-ink)]",
                    )}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Badge (opsional)
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => set("badge", undefined)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                  !p.badge
                    ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]"
                    : "bg-white/60 border-white/80",
                )}
              >
                Tidak ada
              </button>
              {BADGES.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => set("badge", b)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                    p.badge === b
                      ? "bg-[var(--color-gold)] text-white border-[var(--color-gold)]"
                      : "bg-white/60 border-white/80",
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        <div className="space-y-5">
          <GlassCard className="p-6 space-y-4">
            <h2 className="font-display font-bold">Foto produk</h2>
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[var(--color-accent-soft)]/30">
              {p.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ProductImage
                  brand={p.brand}
                  name={p.name || "Nama Produk"}
                  seed={p.id || p.name}
                  rounded="rounded-none"
                />
              )}
            </div>
            <div className="flex gap-2">
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={onUpload}
                  className="sr-only"
                />
                <span className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-[var(--color-accent)] text-white font-medium text-sm hover:bg-[var(--color-accent-deep)] transition">
                  {uploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {uploading ? "Mengupload..." : "Upload Foto"}
                </span>
              </label>
              {p.imageUrl && (
                <button
                  type="button"
                  onClick={() => set("imageUrl", "")}
                  className="px-3 py-2.5 rounded-full glass-strong text-[var(--color-ink-soft)] hover:text-[#9c322a]"
                  title="Hapus foto, kembali ke ilustrasi default"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-[11px] text-[var(--color-ink-soft)]">
              Maks 4MB · JPG/PNG/WebP/AVIF · Tanpa foto = pakai ilustrasi
              SVG branded otomatis.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <h2 className="font-display font-bold">Status</h2>
            <Toggle
              label="Tersedia (in stock)"
              checked={p.inStock !== false}
              onChange={(v) => set("inStock", v)}
              hint="Off = tampil sebagai 'Stok Habis' di katalog"
            />
            <Toggle
              label="Tampilkan di featured (homepage)"
              checked={!!p.featured}
              onChange={(v) => set("featured", v)}
              icon={<Star className="w-3.5 h-3.5" />}
            />
          </GlassCard>
        </div>
      </div>

      <GlassCard className="p-6 space-y-3">
        <h2 className="font-display font-bold">Harga per ukuran (Rupiah)</h2>
        <p className="text-xs text-[var(--color-ink-soft)]">
          Isi 0 untuk ukuran yang tidak tersedia.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {SIZES.map((s) => (
            <Input
              key={s}
              label={`${s}`}
              hint={parseInt(s) <= 5 ? "Repack" : "Sak"}
              type="number"
              inputMode="numeric"
              min={0}
              value={getVariantPrice(s) || ""}
              placeholder="0"
              onChange={(e) =>
                setVariantPrice(s, parseInt(e.target.value || "0", 10))
              }
            />
          ))}
        </div>
      </GlassCard>
    </form>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  hint,
  icon,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex items-start gap-3 text-left p-2 rounded-lg hover:bg-white/40"
    >
      <span
        className={cn(
          "relative w-10 h-6 rounded-full transition shrink-0 mt-0.5",
          checked ? "bg-[var(--color-accent)]" : "bg-[var(--color-ink-soft)]/30",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 w-5 h-5 rounded-full bg-white transition shadow",
            checked ? "left-[18px]" : "left-0.5",
          )}
        />
      </span>
      <span className="flex-1 min-w-0">
        <span className="text-sm font-medium flex items-center gap-1">
          {icon} {label}
        </span>
        {hint && (
          <span className="block text-[11px] text-[var(--color-ink-soft)] mt-0.5">
            {hint}
          </span>
        )}
      </span>
    </button>
  );
}
