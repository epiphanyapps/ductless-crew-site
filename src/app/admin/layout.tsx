import type { Metadata } from "next";
import AdminAuthGate from "@/components/admin/AdminAuthGate";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// An authenticated shell must never be prerendered or cached.
export const dynamic = "force-dynamic";

export default function AdminRouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminAuthGate>{children}</AdminAuthGate>;
}
