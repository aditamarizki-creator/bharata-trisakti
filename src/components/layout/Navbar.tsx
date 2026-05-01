"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button, LinkButton } from "@/components/ui/Button";
import { useCart, cartSelectors } from "@/lib/cart-store";
import { buildGeneralInquiry, waUrl } from "@/lib/wa";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const count = useCart(cartSelectors.count);
  const hydrated = useCart((s) => s.hasHydrated);
  const openCart = useCart((s) => s.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full px-3 pt-3">
      <nav
        className={cn(
          "max-w-7xl mx-auto rounded-full px-4 sm:px-5 py-2.5 flex items-center gap-3 transition-all",
          scrolled ? "glass-strong" : "glass",
        )}
      >
        <Link href="/" className="flex items-center" aria-label="Bharata Trisakti">
          <Logo />
        </Link>

        <ul className="hidden md:flex items-center gap-1 ml-6">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition",
                    active
                      ? "bg-white/80 text-[var(--color-accent-deep)]"
                      : "text-[var(--color-ink)] hover:bg-white/60",
                  )}
                >
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative w-10 h-10 grid place-items-center rounded-full hover:bg-white/70 transition"
            aria-label="Buka keranjang"
          >
            <ShoppingBag className="w-5 h-5" />
            {hydrated && count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold grid place-items-center">
                {count}
              </span>
            )}
          </button>

          <LinkButton
            href={waUrl(buildGeneralInquiry())}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Pesan via WA
          </LinkButton>

          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            className="md:hidden w-10 h-10 grid place-items-center rounded-full hover:bg-white/70"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 glass-strong rounded-3xl p-3">
          <ul className="flex flex-col">
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={cn(
                      "block px-4 py-3 rounded-2xl text-sm font-medium",
                      active
                        ? "bg-white/80 text-[var(--color-accent-deep)]"
                        : "text-[var(--color-ink)] hover:bg-white/60",
                    )}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-2">
            <Button
              variant="whatsapp"
              size="md"
              className="w-full"
              onClick={() => {
                window.open(waUrl(buildGeneralInquiry()), "_blank");
              }}
            >
              Pesan via WhatsApp
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
