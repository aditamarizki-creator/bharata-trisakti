"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Megaphone, Save } from "lucide-react";
import type { Settings } from "@/types/product";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";

type Props = { initial: Settings };

export function BannerForm({ initial }: Props) {
  const router = useRouter();
  const [s, setS] = useState<Settings["promoBanner"]>(initial.promoBanner);
  const [saving, setSaving] = useState(false);

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promoBanner: s }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal menyimpan");
        return;
      }
      toast.success("Banner tersimpan");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-3xl">
      <header>
        <h1 className="font-display font-extrabold text-3xl flex items-center gap-2">
          <Megaphone className="w-7 h-7 text-[var(--color-accent)]" />
          Promo Banner
        </h1>
        <p className="text-[var(--color-ink-soft)] text-sm mt-1">
          Banner di paling atas website. Cocok untuk promo, pengumuman libur,
          atau diskon terbatas.
        </p>
      </header>

      {/* Preview */}
      <div>
        <p className="text-xs uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">
          Preview live
        </p>
        {s.enabled && s.text ? (
          <div className="rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[var(--color-accent-deep)] via-[var(--color-accent)] to-[var(--color-accent-deep)] text-white px-4 py-2 flex items-center gap-3">
              <Megaphone className="w-4 h-4 shrink-0 opacity-90" />
              <span className="flex-1 text-sm text-center font-medium leading-tight">
                {s.text}
              </span>
              <span className="w-7 h-7 grid place-items-center rounded-full opacity-70">
                ×
              </span>
            </div>
          </div>
        ) : (
          <GlassCard className="p-4 text-sm text-[var(--color-ink-soft)] text-center italic">
            Banner non-aktif — toggle ON di bawah untuk preview.
          </GlassCard>
        )}
      </div>

      <GlassCard className="p-6 space-y-4">
        <button
          type="button"
          onClick={() => setS((x) => ({ ...x, enabled: !x.enabled }))}
          className="w-full flex items-start gap-3 text-left p-2 rounded-lg hover:bg-white/40"
        >
          <span
            className={cn(
              "relative w-12 h-7 rounded-full transition shrink-0 mt-0.5",
              s.enabled ? "bg-[var(--color-accent)]" : "bg-[var(--color-ink-soft)]/30",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 w-6 h-6 rounded-full bg-white transition shadow",
                s.enabled ? "left-[22px]" : "left-0.5",
              )}
            />
          </span>
          <span className="flex-1">
            <span className="text-sm font-display font-bold">
              {s.enabled ? "Banner aktif" : "Banner non-aktif"}
            </span>
            <span className="block text-xs text-[var(--color-ink-soft)] mt-0.5">
              Tampil di paling atas semua halaman website. User bisa close,
              tersimpan per browser sampai text berubah.
            </span>
          </span>
        </button>

        <Input
          label="Text banner"
          required={s.enabled}
          placeholder="contoh: 🎉 Diskon 10% pakan koi sampai Lebaran — chat WA untuk klaim"
          value={s.text}
          onChange={(e) => setS({ ...s, text: e.target.value })}
          hint="Disarankan singkat (1 kalimat). Pakai emoji untuk menarik perhatian."
        />

        <Input
          label="Link saat banner di-klik (opsional)"
          placeholder="/katalog atau https://wa.me/..."
          value={s.href ?? ""}
          onChange={(e) => setS({ ...s, href: e.target.value })}
          hint="Kosongkan kalau tidak perlu redirect."
        />
      </GlassCard>

      <div className="sticky bottom-4">
        <Button
          type="submit"
          size="lg"
          disabled={saving}
          iconLeft={<Save className="w-4 h-4" />}
        >
          {saving ? "Menyimpan..." : "Simpan Banner"}
        </Button>
      </div>
    </form>
  );
}
