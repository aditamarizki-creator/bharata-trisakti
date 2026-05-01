import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { LiveActivity } from "@/components/LiveActivity";
import { MobileActionBar } from "@/components/MobileActionBar";
import { PromoBanner } from "@/components/PromoBanner";
import { SettingsProvider } from "@/lib/settings-context";
import { getSettings } from "@/lib/storage";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bharata Trisakti — Pakan Premium Koi & Ikan Hias",
  description:
    "Distributor resmi pakan ikan koi & ikan hias: Hiro, Sankoi, STP KAE, Kohaku, PIP, Matahari Sakti, CP Petindo. Original 100%, kirim ke seluruh Indonesia.",
  keywords: [
    "pakan koi",
    "pakan ikan hias",
    "Hiro",
    "Sankoi",
    "STP KAE",
    "Kohaku",
    "Bharata Trisakti",
  ],
};

// Revalidate root layout setiap 60 detik (mengambil settings terbaru)
export const revalidate = 60;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="id" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-[family-name:var(--font-inter)] pb-[calc(env(safe-area-inset-bottom,0px)+72px)] md:pb-0">
        <SettingsProvider value={settings}>
          <PromoBanner />
          <div className="relative z-10">
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
          <WhatsAppFAB />
          <LiveActivity />
          <MobileActionBar />
        </SettingsProvider>
        <Toaster
          position="top-center"
          richColors
          theme="light"
          toastOptions={{
            style: {
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.7)",
            },
          }}
        />
      </body>
    </html>
  );
}
