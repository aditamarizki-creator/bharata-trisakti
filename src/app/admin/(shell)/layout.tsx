import { AdminShell } from "../AdminShell";

export const dynamic = "force-dynamic";

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
