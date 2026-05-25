import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdmin } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default function Dashboard() {
  const admin = getAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <main className="min-h-screen px-6 md:px-14 py-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-forest-600">Admin</div>
          <h1 className="font-display text-5xl text-forest-950 mt-2">Dashboard</h1>
        </div>
        <LogoutButton />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Link href="/admin/messages" className="border border-forest-100 bg-white p-8 hover:border-forest-500 transition-colors group">
          <div className="text-xs tracking-[0.3em] uppercase text-forest-600 mb-3">Inbox</div>
          <h2 className="font-display text-3xl text-forest-950 group-hover:text-forest-700">Contact Messages →</h2>
          <p className="text-sm text-forest-700 mt-2">View and manage all contact form submissions.</p>
        </Link>
        <div className="border border-forest-100 bg-white p-8">
          <div className="text-xs tracking-[0.3em] uppercase text-forest-600 mb-3">Signed in</div>
          <h2 className="font-display text-2xl text-forest-950">{admin.email}</h2>
          <p className="text-sm text-forest-700 mt-2">Session valid for 7 days.</p>
        </div>
      </div>
    </main>
  );
}
