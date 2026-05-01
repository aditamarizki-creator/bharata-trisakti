import { Star } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const reviews = [
  {
    name: "Budi Hartono",
    location: "Surabaya",
    role: "Pehobi Koi",
    rating: 5,
    text: "Sudah langganan setahun lebih. Hiro Color Up bikin warna koi saya pop banget, apalagi sumi-nya. Pengiriman selalu rapi.",
  },
  {
    name: "Sari Wulandari",
    location: "Jakarta",
    role: "Pemula Akuarium",
    rating: 5,
    text: "Admin sabar bantu pilihkan pakan untuk akuarium komunitas saya. Harga lebih murah dari toko offline langganan.",
  },
  {
    name: "Pak Eko",
    location: "Bandung",
    role: "Reseller",
    rating: 5,
    text: "Stok lengkap, brand yang dicari customer selalu ada. Kirim ke gudang kami via J&T Cargo, sehari sampai.",
  },
];

export function Testimonials() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-deep)] mb-2">
              Testimoni
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--color-ink)] text-balance">
              Cerita pehobi yang sudah percaya
            </h2>
          </div>
          <div className="flex items-center gap-2 glass rounded-full px-4 py-2 self-start md:self-auto">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-[var(--color-gold)] fill-[var(--color-gold)]"
                />
              ))}
            </span>
            <span className="text-sm font-semibold">4.9 / 5</span>
            <span className="text-xs text-[var(--color-ink-soft)]">
              (1.200+ ulasan)
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <GlassCard key={r.name} className="p-6 flex flex-col">
              <span className="flex mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[var(--color-gold)] fill-[var(--color-gold)]"
                  />
                ))}
              </span>
              <p className="text-[var(--color-ink)] leading-relaxed text-[15px] flex-1">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-5 pt-5 border-t border-white/60 flex items-center gap-3">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] text-white font-display font-bold">
                  {r.name[0]}
                </span>
                <div>
                  <p className="font-display font-bold text-sm text-[var(--color-ink)]">
                    {r.name}
                  </p>
                  <p className="text-xs text-[var(--color-ink-soft)]">
                    {r.role} · {r.location}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
