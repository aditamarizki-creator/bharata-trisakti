import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console — Bharata Trisakti",
  robots: "noindex, nofollow",
};

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
