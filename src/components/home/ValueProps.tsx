import { ShieldCheck, Coins, Truck, MessageCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const items = [
  {
    icon: ShieldCheck,
    title: "Original 100%",
    desc: "Distributor resmi. Tiap kemasan dijamin asli dari produsen brand pilihan Anda.",
  },
  {
    icon: Coins,
    title: "Harga Bersaing",
    desc: "Tanpa minimum order, tanpa harga grosir vs eceran — semua dapat harga terbaik.",
  },
  {
    icon: Truck,
    title: "Kirim Nasional",
    desc: "JNE Reguler, POS Indonesia, dan J&T Cargo. Sampai 1–3 hari ke kota Anda.",
  },
  {
    icon: MessageCircle,
    title: "Konsultasi Gratis",
    desc: "Bingung pilih pakan? Admin siap bantu pilihkan sesuai jenis & ukuran ikan Anda.",
  },
];

export function ValueProps() {
  return (
    <section className="px-4 py-10">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <GlassCard key={it.title} className="p-6 hover:translate-y-[-2px] transition">
            <span className="inline-grid place-items-center w-12 h-12 rounded-2xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] mb-4">
              <it.icon className="w-5 h-5" />
            </span>
            <h3 className="font-display font-bold text-[var(--color-ink)] text-lg mb-1.5">
              {it.title}
            </h3>
            <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
              {it.desc}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
