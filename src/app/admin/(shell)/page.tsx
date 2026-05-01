import Link from "next/link";
import { Package, Settings, Megaphone, Plus, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { LinkButton } from "@/components/ui/Button";
import { getProducts, getSettings, isStorageConfigured } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [products, settings] = await Promise.all([
    getProducts(),
    getSettings(),
  ]);
  const inStock = products.filter((p) => p.inStock !== false).length;
  const outOfStock = products.length - inStock;
  const featured = products.filter((p) => p.featured).length;
  const storageOk = isStorageConfigured();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display font-extrabold text-3xl">Dashboard</h1>
        <p className="text-[var(--color-ink-soft)] text-sm mt-1">
          Kelola produk, settings, dan promo banner toko Anda dari sini.
        </p>
      </header>

      {!storageOk && (
        <GlassCard className="p-5 border-l-4 border-[var(--color-gold)]">
          <p className="font-display font-bold text-sm">
            ⚠️ Storage belum di-setup
          </p>
          <p className="text-xs text-[var(--color-ink-soft)] mt-1">
            Anda masih pakai memory storage — perubahan akan hilang saat
            redeploy. Buka Vercel dashboard → Storage → Create KV (Upstash) →
            Connect ke project ini. Env vars akan otomatis ter-inject.
          </p>
        </GlassCard>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total produk" value={products.length} icon={Package} />
        <Stat label="Tersedia" value={inStock} icon={Package} color="success" />
        <Stat label="Stok habis" value={outOfStock} icon={Package} color="danger" />
        <Stat label="Featured" value={featured} icon={Package} color="gold" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <GlassCard className="p-6">
          <div className="flex items-start gap-3">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] shrink-0">
              <Plus className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold">Tambah produk baru</h3>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1 mb-4">
                Tambah produk ke katalog dengan brand, varian ukuran, dan foto.
              </p>
              <LinkButton href="/admin/products/new" size="sm">
                Tambah Produk
              </LinkButton>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-start gap-3">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] shrink-0">
              <Megaphone className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold">Promo banner</h3>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1 mb-4">
                Banner top:{" "}
                <strong>
                  {settings.promoBanner.enabled ? "Aktif" : "Tidak aktif"}
                </strong>
                {settings.promoBanner.enabled
                  ? ` — "${settings.promoBanner.text.slice(0, 50)}${settings.promoBanner.text.length > 50 ? "…" : ""}"`
                  : ""}
              </p>
              <LinkButton href="/admin/banner" variant="secondary" size="sm">
                Edit Banner
              </LinkButton>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-start gap-3">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] shrink-0">
              <Settings className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold">Settings toko</h3>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1 mb-4">
                WhatsApp:{" "}
                <strong className="font-mono">+{settings.waNumber}</strong>
              </p>
              <LinkButton href="/admin/settings" variant="secondary" size="sm">
                Edit Settings
              </LinkButton>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-start gap-3">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-accent-soft)]/60 text-[var(--color-accent-deep)] shrink-0">
              <ExternalLink className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold">Lihat website</h3>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1 mb-4">
                Buka storefront di tab baru untuk preview perubahan.
              </p>
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent-deep)] hover:underline"
              >
                Buka /
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  color = "default",
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color?: "default" | "success" | "danger" | "gold";
}) {
  const tint = {
    default: "from-[var(--color-accent)] to-[var(--color-accent-deep)]",
    success: "from-[var(--color-success)] to-[#1e6b3f]",
    danger: "from-[#c0463e] to-[#9c322a]",
    gold: "from-[var(--color-gold)] to-[#a08540]",
  }[color];
  return (
    <GlassCard className="p-5">
      <p className="text-xs uppercase tracking-wider text-[var(--color-ink-soft)]">
        {label}
      </p>
      <p
        className={`font-display font-extrabold text-3xl mt-1 bg-gradient-to-br ${tint} bg-clip-text text-transparent`}
      >
        {value}
      </p>
    </GlassCard>
  );
}
