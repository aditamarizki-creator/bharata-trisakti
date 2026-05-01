"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Settings,
  Megaphone,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produk", icon: Package },
  { href: "/admin/banner", label: "Promo Banner", icon: Megaphone },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] grid lg:grid-cols-[260px_1fr]">
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 glass-strong px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="w-10 h-10 grid place-items-center rounded-full hover:bg-white/70"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "lg:sticky lg:top-0 lg:h-screen p-4 lg:p-5 lg:border-r lg:border-white/60 lg:bg-white/30 lg:backdrop-blur-sm",
          open ? "block" : "hidden lg:block",
        )}
      >
        <div className="hidden lg:block mb-8">
          <Link href="/admin">
            <Logo />
          </Link>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.map((n) => {
            const active =
              n.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition",
                  active
                    ? "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-deep)] text-white shadow-[0_4px_12px_rgba(14,124,134,0.3)]"
                    : "text-[var(--color-ink)] hover:bg-white/60",
                )}
              >
                <n.icon className="w-4 h-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 pt-6 border-t border-white/60 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[var(--color-ink-soft)] hover:bg-white/60 hover:text-[var(--color-ink)]"
          >
            <ExternalLink className="w-4 h-4" />
            Lihat website
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[var(--color-ink-soft)] hover:bg-[#FAE0DD] hover:text-[#9c322a] transition"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      <main className="px-4 py-6 lg:px-8 lg:py-10 max-w-6xl">
        {children}
      </main>
    </div>
  );
}
