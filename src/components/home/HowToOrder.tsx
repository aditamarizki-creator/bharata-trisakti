import Link from "next/link";
import { ListChecks, ClipboardList, MessageCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const steps = [
  {
    n: "01",
    icon: ListChecks,
    title: "Pilih Produk",
    desc: "Telusuri katalog, pilih brand & ukuran kemasan. Tambah ke keranjang.",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Isi Form Pesanan",
    desc: "Lengkapi nama, alamat, dan kurir pilihan. Tidak perlu daftar akun.",
  },
  {
    n: "03",
    icon: MessageCircle,
    title: "Konfirmasi via WhatsApp",
    desc: "Pesanan otomatis terkirim ke admin. Admin balas dengan total + ongkir final.",
  },
];

export function HowToOrder() {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-deep)] mb-2">
            Cara Pesan
          </p>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--color-ink)] text-balance">
            Pesanan sampai di rumah dalam 3 langkah
          </h2>
          <p className="text-[var(--color-ink-soft)] mt-3">
            Sederhana, cepat, dan tanpa ribet — semua via WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 relative">
          {steps.map((s, i) => (
            <GlassCard key={s.n} className="p-7 relative">
              <div className="flex items-center justify-between mb-5">
                <span className="font-display text-5xl font-extrabold text-[var(--color-accent-soft)]">
                  {s.n}
                </span>
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] text-white">
                  <s.icon className="w-5 h-5" />
                </span>
              </div>
              <h3 className="font-display font-bold text-[var(--color-ink)] text-xl mb-1.5">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                {s.desc}
              </p>
              {i === 0 && (
                <Link
                  href="/katalog"
                  className="inline-block mt-4 text-sm font-semibold text-[var(--color-accent-deep)] hover:underline"
                >
                  Lihat katalog →
                </Link>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
