"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  Truck,
  Package,
} from "lucide-react";
import type { OrderForm } from "@/types/product";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button, LinkButton } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { ProductImage } from "@/components/product/ProductImage";
import { useCart, cartSelectors } from "@/lib/cart-store";
import { formatRupiah, formatPhoneIndonesia } from "@/lib/format";
import { buildOrderMessage, openWhatsApp, buildGeneralInquiry, waUrl } from "@/lib/wa";
import { cn } from "@/lib/cn";

const KURIR: { id: OrderForm["kurir"]; desc: string }[] = [
  { id: "JNE Reguler", desc: "1-3 hari, terjangkau" },
  { id: "POS Indonesia", desc: "Jangkauan paling luas" },
  { id: "J&T Cargo", desc: "Untuk paket besar (>10kg)" },
];

const initialForm: OrderForm = {
  nama: "",
  hp: "",
  email: "",
  alamat: "",
  kota: "",
  kodepos: "",
  kurir: "JNE Reguler",
  catatan: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const subtotal = useCart(cartSelectors.subtotal);
  const clearCart = useCart((s) => s.clearCart);
  const hydrated = useCart((s) => s.hasHydrated);

  const [form, setForm] = useState<OrderForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (hydrated && items.length === 0 && !submitting) {
      // user landed di checkout dengan cart kosong
    }
  }, [hydrated, items.length, submitting]);

  function set<K extends keyof OrderForm>(key: K, value: OrderForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof OrderForm, string>> = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi";
    if (!form.hp.trim()) e.hp = "Nomor WhatsApp wajib diisi";
    else if (form.hp.replace(/\D/g, "").length < 9)
      e.hp = "Nomor terlalu pendek";
    if (!form.alamat.trim()) e.alamat = "Alamat wajib diisi";
    if (!form.kota.trim()) e.kota = "Kota wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (items.length === 0) {
      toast.error("Keranjang masih kosong");
      return;
    }
    if (!validate()) {
      toast.error("Lengkapi data pengiriman terlebih dahulu");
      return;
    }
    setSubmitting(true);
    const msg = buildOrderMessage(items, form);
    openWhatsApp(msg);
    setTimeout(() => {
      clearCart();
      toast.success("Pesanan terkirim ke admin via WhatsApp 🎉");
      router.push("/");
    }, 800);
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="px-4 py-16">
        <div className="max-w-xl mx-auto">
          <GlassCard className="p-10 text-center">
            <span className="inline-grid place-items-center w-16 h-16 rounded-2xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] mb-3">
              <ShoppingBag className="w-7 h-7" />
            </span>
            <h1 className="font-display font-extrabold text-2xl mb-2">
              Keranjang masih kosong
            </h1>
            <p className="text-[var(--color-ink-soft)] mb-6">
              Pilih produk dari katalog terlebih dahulu sebelum melanjutkan
              pesanan.
            </p>
            <div className="flex gap-2 justify-center">
              <LinkButton href="/katalog">Lihat Katalog</LinkButton>
              <LinkButton
                href={waUrl(buildGeneralInquiry())}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
              >
                Tanya Admin
              </LinkButton>
            </div>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/katalog"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-accent-deep)] mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke katalog
        </Link>

        <header className="mb-7">
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--color-ink)]">
            Selesaikan Pesanan
          </h1>
          <p className="text-[var(--color-ink-soft)] mt-1.5">
            Pesanan akan terkirim ke admin via WhatsApp untuk konfirmasi
            ongkir & ketersediaan stok.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-6">
          {/* Form */}
          <GlassCard className="lg:col-span-7 p-6 md:p-8 space-y-5">
            <h2 className="font-display font-bold text-lg">
              Data Pengiriman
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Nama lengkap"
                name="nama"
                required
                placeholder="Nama Anda"
                value={form.nama}
                onChange={(e) => set("nama", e.target.value)}
                error={errors.nama}
              />
              <Input
                label="Nomor WhatsApp"
                name="hp"
                required
                inputMode="tel"
                placeholder="0857-0240-3940"
                value={form.hp}
                onChange={(e) => set("hp", formatPhoneIndonesia(e.target.value))}
                error={errors.hp}
              />
            </div>

            <Input
              label="Email (opsional)"
              name="email"
              type="email"
              placeholder="email@anda.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />

            <Input
              label="Alamat lengkap"
              name="alamat"
              required
              placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan"
              value={form.alamat}
              onChange={(e) => set("alamat", e.target.value)}
              error={errors.alamat}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Kota / Kabupaten"
                name="kota"
                required
                placeholder="Surabaya"
                value={form.kota}
                onChange={(e) => set("kota", e.target.value)}
                error={errors.kota}
              />
              <Input
                label="Kode pos"
                name="kodepos"
                inputMode="numeric"
                placeholder="60293"
                value={form.kodepos}
                onChange={(e) => set("kodepos", e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Pilih kurir <span className="text-[var(--color-accent)]">*</span>
              </label>
              <div className="grid sm:grid-cols-3 gap-2">
                {KURIR.map((k) => {
                  const active = form.kurir === k.id;
                  return (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => set("kurir", k.id)}
                      className={cn(
                        "text-left p-3 rounded-xl border transition",
                        active
                          ? "bg-[var(--color-accent)]/10 border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/30"
                          : "bg-white/60 border-white/80 hover:border-[var(--color-accent-soft)]",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Truck
                          className={cn(
                            "w-4 h-4",
                            active
                              ? "text-[var(--color-accent-deep)]"
                              : "text-[var(--color-ink-soft)]",
                          )}
                        />
                        <span className="font-semibold text-sm">{k.id}</span>
                      </div>
                      <p className="text-[11px] text-[var(--color-ink-soft)] mt-1">
                        {k.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[var(--color-ink-soft)] mt-1.5">
                Tarif ongkir dikonfirmasi admin sesuai berat & lokasi.
              </p>
            </div>

            <Textarea
              label="Catatan (opsional)"
              name="catatan"
              placeholder="Contoh: tolong dititip tetangga jika tidak ada di rumah"
              value={form.catatan}
              onChange={(e) => set("catatan", e.target.value)}
            />
          </GlassCard>

          {/* Summary */}
          <aside className="lg:col-span-5">
            <GlassCard variant="strong" className="p-6 md:p-8 sticky top-24">
              <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Ringkasan Pesanan
              </h2>

              <ul className="divide-y divide-white/60 max-h-72 overflow-y-auto pr-1">
                {items.map((it) => (
                  <li
                    key={`${it.productId}-${it.size}`}
                    className="py-3 flex gap-3"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[var(--color-accent-soft)]/30 shrink-0">
                      <ProductImage
                        brand={it.brand}
                        name={it.name}
                        seed={it.productId}
                        rounded="rounded-none"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wide text-[var(--color-accent-deep)] font-bold">
                        {it.brand}
                      </p>
                      <p className="text-sm font-semibold leading-tight line-clamp-1">
                        {it.name}
                      </p>
                      <p className="text-xs text-[var(--color-ink-soft)]">
                        {it.size} · x{it.qty}
                      </p>
                    </div>
                    <p className="text-sm font-bold tabular-nums shrink-0">
                      {formatRupiah(it.price * it.qty)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/60 pt-4 mt-4 space-y-1.5">
                <div className="flex justify-between text-sm text-[var(--color-ink-soft)]">
                  <span>Subtotal ({items.length} item)</span>
                  <span className="tabular-nums">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-[var(--color-ink-soft)]">
                  <span>Ongkir</span>
                  <span>Dikonfirmasi admin</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-display font-bold">Total</span>
                  <span className="font-display font-extrabold text-2xl text-[var(--color-accent-deep)] tabular-nums">
                    {formatRupiah(subtotal)}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                variant="whatsapp"
                size="lg"
                className="w-full mt-5"
                disabled={submitting}
                iconLeft={<MessageCircle className="w-5 h-5" />}
              >
                {submitting
                  ? "Mengirim..."
                  : "Kirim Pesanan via WhatsApp"}
              </Button>

              <p className="text-[11px] text-[var(--color-ink-soft)] text-center mt-3 leading-relaxed">
                Dengan klik tombol di atas, WhatsApp akan terbuka dengan
                template pesanan yang sudah lengkap. Tinggal kirim ke admin.
              </p>
            </GlassCard>
          </aside>
        </form>
      </div>
    </div>
  );
}
