import Link from "next/link";
import { MapPin, Phone, Clock, Truck } from "lucide-react";
import { Logo } from "./Logo";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-6 pt-16 mt-20">
      <GlassCard className="max-w-7xl mx-auto p-8 md:p-12">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Toko pakan ikan koi & ikan hias terpercaya. Distributor resmi
              brand-brand premium dengan jangkauan pengiriman seluruh
              Indonesia.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              <Badge variant="accent">Hiro</Badge>
              <Badge variant="accent">Sankoi</Badge>
              <Badge variant="accent">STP KAE</Badge>
              <Badge variant="accent">Kohaku</Badge>
              <Badge variant="accent">PIP</Badge>
              <Badge variant="accent">+ lainnya</Badge>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-[var(--color-ink)] mb-3">
              Navigasi
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-ink-soft)]">
              <li>
                <Link href="/" className="hover:text-[var(--color-accent-deep)]">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-[var(--color-accent-deep)]">
                  Katalog Produk
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-[var(--color-accent-deep)]">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/6285702403940"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-accent-deep)]"
                >
                  Pesan via WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <h4 className="font-display font-bold text-[var(--color-ink)] mb-3">
              Kontak & Pengiriman
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--color-ink-soft)]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-[var(--color-accent)] shrink-0" />
                <span>
                  Jl. Raya Grajagan, Krajan, Purwoharjo, Kec. Purwoharjo,
                  Kabupaten Banyuwangi, Jawa Timur 68483
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 text-[var(--color-accent)] shrink-0" />
                <a
                  href="https://wa.me/6285702403940"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-accent-deep)]"
                >
                  +62 857-0240-3940 (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-[var(--color-accent)] shrink-0" />
                <span>Senin–Sabtu, 08.00–16.00 WIB</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 mt-0.5 text-[var(--color-accent)] shrink-0" />
                <span>JNE Reguler · POS Indonesia · J&amp;T Cargo</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/60 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--color-ink-soft)]">
          <p>© {new Date().getFullYear()} Bharata Trisakti. All rights reserved.</p>
          <p>Pakan ikan koi & hias · Kirim seluruh Indonesia</p>
        </div>
      </GlassCard>
    </footer>
  );
}
