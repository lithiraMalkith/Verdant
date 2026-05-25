import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { Contact } from "@/models/Contact";
import MessagesTable from "@/components/MessagesTable";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  if (!getAdmin()) redirect("/admin/login");
  await dbConnect();
  const raw = await Contact.find().sort({ createdAt: -1 }).lean();
  const items = raw.map((m: any) => ({
    _id: String(m._id),
    fullName: m.fullName,
    email: m.email,
    phone: m.phone,
    propertyType: m.propertyType,
    message: m.message,
    createdAt: new Date(m.createdAt).toISOString(),
  }));

  return (
    <main className="min-h-screen px-6 md:px-14 py-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <Link href="/admin/dashboard" className="text-xs tracking-[0.2em] uppercase text-forest-600 hover:text-forest-500">← Dashboard</Link>
        <h1 className="font-display text-5xl text-forest-950 mt-3">Contact Messages</h1>
        <p className="text-sm text-forest-700 mt-2">{items.length} submission{items.length === 1 ? "" : "s"}</p>
      </div>
      <MessagesTable initial={items} />
    </main>
  );
}
