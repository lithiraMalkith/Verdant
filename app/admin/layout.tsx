import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-forest-50/40">
      {children}
    </div>
  );
}
