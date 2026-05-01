import { MapPin, Phone, Mail, Clock, MessageCircle, Award, Users, Truck, Globe } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { buildGeneralInquiry, waUrl } from "@/lib/wa";

const stats = [
  { icon: Award, label: "Brand Resmi", value: "7" },
  { icon: Users, label: "Pelanggan", value: "1.200+" },
  { icon: Globe, label: "Kota Terjangkau", value: "200+" },
  { icon: Truck, label: "Order/Bulan", value: "500+" },
];

export default function TentangPage() {
  return (
    <div className="px-4 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        <header className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="accent" className="mb-3">
            Tentang Kami
          </Badge>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--color-ink)] text-balance leading-[1.1]">
            Toko pakan ikan koi & hias kepercayaan{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-deep)] bg-clip-text text-transparent">
              hobiis Indonesia
            </span>
          </h1>
          <p className="text-[var(--color-ink-soft)] mt-4 leading-relaxed">
            Bharata Trisakti hadir untuk menjawab kebutuhan pehobi koi, penghobi
            ikan hias, hingga reseller akan akses pakan berkualitas dengan
            jaminan keaslian dan harga yang bersaing.
          </p>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s) => (
            <GlassCard key={s.label} className="p-5 text-center">
              <span className="inline-grid place-items-center w-11 h-11 rounded-2xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] mb-3">
                <s.icon className="w-5 h-5" />
              </span>
              <p className="font-display font-extrabold text-2xl md:text-3xl text-[var(--color-ink)]">
                {s.value}
              </p>
              <p className="text-xs text-[var(--color-ink-soft)] mt-0.5">
                {s.label}
              </p>
            </GlassCard>
          ))}
        </section>

        {/* Story */}
        <section className="grid lg:grid-cols-12 gap-6 mb-12">
          <GlassCard className="lg:col-span-7 p-7 md:p-10">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl mb-4">
              Berdiri dari kecintaan pada ikan koi & hias
            </h2>
            <div className="space-y-3 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
              <p>
                Bharata Trisakti dimulai dari pengalaman pribadi merawat koi
                bertahun-tahun: kesulitan mencari pakan original dengan harga
                wajar, stok yang sering habis, dan toko yang kurang paham
                kebutuhan ikan kita.
              </p>
              <p>
                Sekarang kami menjadi distributor resmi 7 brand terkemuka —
                Hiro, Sankoi, STP KAE, Kohaku, PIP, Matahari Sakti, dan CP
                Petindo — melayani pengiriman ke seluruh Indonesia melalui JNE
                Reguler, POS Indonesia, dan J&amp;T Cargo.
              </p>
              <p>
                Visi kami sederhana: setiap pehobi ikan di Indonesia bisa
                memberikan yang terbaik untuk peliharaan kesayangannya, tanpa
                harus repot mencari atau khawatir keaslian.
              </p>
            </div>
          </GlassCard>

          <GlassCard
            variant="tint"
            className="lg:col-span-5 p-7 md:p-10 flex flex-col"
          >
            <h3 className="font-display font-extrabold text-xl mb-4">
              Yang membuat kami berbeda
            </h3>
            <ul className="space-y-3 text-sm text-[var(--color-ink)] flex-1">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--color-accent)] text-white grid place-items-center text-xs font-bold mt-0.5 shrink-0">
                  ✓
                </span>
                <span>
                  <strong>Distributor resmi</strong> — bukan reseller lapis
                  kedua. Stok langsung dari produsen.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--color-accent)] text-white grid place-items-center text-xs font-bold mt-0.5 shrink-0">
                  ✓
                </span>
                <span>
                  <strong>Tanpa minimum order</strong> — beli 1 kg pun kami
                  layani dengan baik.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--color-accent)] text-white grid place-items-center text-xs font-bold mt-0.5 shrink-0">
                  ✓
                </span>
                <span>
                  <strong>Konsultasi gratis</strong> — admin paham kebutuhan
                  ikan, siap bantu pilihkan pakan.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--color-accent)] text-white grid place-items-center text-xs font-bold mt-0.5 shrink-0">
                  ✓
                </span>
                <span>
                  <strong>Packing aman</strong> — bubble wrap & dus sesuai
                  ukuran kemasan.
                </span>
              </li>
            </ul>
          </GlassCard>
        </section>

        {/* Kontak */}
        <section className="grid lg:grid-cols-12 gap-6">
          <GlassCard className="lg:col-span-5 p-7 md:p-10">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl mb-5">
              Hubungi kami
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[var(--color-ink-soft)] text-xs">
                    WhatsApp Admin
                  </p>
                  <a
                    href="https://wa.me/6285702403940"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-bold text-[var(--color-ink)] hover:text-[var(--color-accent-deep)]"
                  >
                    +62 857-0240-3940
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] shrink-0">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[var(--color-ink-soft)] text-xs">
                    Jam Operasional
                  </p>
                  <p className="font-semibold">
                    Senin–Sabtu, 08.00–17.00 WIB
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[var(--color-ink-soft)] text-xs">
                    Alamat Toko
                  </p>
                  <p className="font-semibold">
                    Bharata Trisakti — Indonesia
                  </p>
                  <p className="text-xs text-[var(--color-ink-soft)] mt-0.5">
                    Pengiriman seluruh Indonesia via JNE / POS / J&amp;T Cargo
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] shrink-0">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[var(--color-ink-soft)] text-xs">Email</p>
                  <p className="font-semibold">halo@bharatatrisakti.id</p>
                </div>
              </li>
            </ul>

            <LinkButton
              href={waUrl(buildGeneralInquiry())}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="w-full mt-7"
              iconLeft={<MessageCircle className="w-4 h-4" />}
            >
              Chat Admin Sekarang
            </LinkButton>
          </GlassCard>

          <GlassCard className="lg:col-span-7 p-2 overflow-hidden">
            <div className="aspect-[4/3] md:aspect-auto md:h-full w-full rounded-2xl overflow-hidden bg-[var(--color-accent-soft)]/30">
              <iframe
                title="Lokasi Bharata Trisakti"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126922.94259544027!2d106.7588490849609!3d-6.229385099999988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 360 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
