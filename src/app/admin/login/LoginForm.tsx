"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Gagal login");
        return;
      }
      router.push(from);
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard variant="strong" className="w-full max-w-md p-8 md:p-10">
      <div className="text-center mb-7">
        <span className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] text-white mb-3 shadow-[0_8px_24px_rgba(14,124,134,0.35)]">
          <Lock className="w-6 h-6" />
        </span>
        <h1 className="font-display font-extrabold text-2xl">Admin Console</h1>
        <p className="text-sm text-[var(--color-ink-soft)] mt-1">
          Bharata Trisakti — login untuk kelola toko
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            label="Password admin"
            name="password"
            type={show ? "text" : "password"}
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error ?? undefined}
            required
            autoFocus
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-[38px] w-7 h-7 grid place-items-center text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
            tabIndex={-1}
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={loading || !password}
        >
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>

      <p className="text-[11px] text-center text-[var(--color-ink-soft)] mt-6">
        Lupa password? Hubungi developer untuk reset via env var Vercel.
      </p>
    </GlassCard>
  );
}
