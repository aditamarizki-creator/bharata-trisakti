"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Phone, Save } from "lucide-react";
import type { Settings } from "@/types/product";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Props = { initial: Settings };

export function SettingsForm({ initial }: Props) {
  const router = useRouter();
  const [s, setS] = useState<Settings>(initial);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof Settings>(k: K, v: Settings[K]) {
    setS((x) => ({ ...x, [k]: v }));
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal menyimpan");
        return;
      }
      setS(data.settings);
      toast.success("Settings tersimpan");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-3xl">
      <header>
        <h1 className="font-display font-extrabold text-3xl">Settings Toko</h1>
        <p className="text-[var(--color-ink-soft)] text-sm mt-1">
          Info ini ditampilkan di footer, kontak, dan tombol WhatsApp di seluruh
          website.
        </p>
      </header>

      <GlassCard className="p-6 space-y-4">
        <h2 className="font-display font-bold flex items-center gap-2">
          <Phone className="w-4 h-4 text-[var(--color-accent)]" />
          WhatsApp Admin
        </h2>
        <Input
          label="Nomor WhatsApp"
          name="waNumber"
          required
          inputMode="tel"
          placeholder="6285702403940"
          value={s.waNumber}
          onChange={(e) => set("waNumber", e.target.value)}
          hint="Format internasional tanpa + atau spasi (62 untuk Indonesia, mis. 6285702403940). Boleh isi 08... — otomatis dikonversi."
        />
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <h2 className="font-display font-bold">Info Toko</h2>
        <Input
          label="Nama toko"
          value={s.storeName}
          onChange={(e) => set("storeName", e.target.value)}
        />
        <Input
          label="Alamat / lokasi"
          value={s.storeAddress}
          onChange={(e) => set("storeAddress", e.target.value)}
          placeholder="contoh: Jl. Raya Grajagan, Krajan, Purwoharjo, Banyuwangi"
        />
        <Input
          label="Jam operasional"
          value={s.storeHours}
          onChange={(e) => set("storeHours", e.target.value)}
          placeholder="contoh: Senin–Sabtu, 08.00–16.00 WIB"
        />
      </GlassCard>

      <div className="sticky bottom-4">
        <Button
          type="submit"
          size="lg"
          disabled={saving}
          iconLeft={<Save className="w-4 h-4" />}
          className="shadow-[0_8px_24px_rgba(14,124,134,0.35)]"
        >
          {saving ? "Menyimpan..." : "Simpan Settings"}
        </Button>
      </div>
    </form>
  );
}
