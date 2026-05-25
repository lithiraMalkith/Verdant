"use client";
import { useState } from "react";
import toast from "react-hot-toast";

type Msg = {
  _id: string; fullName: string; email: string; phone: string;
  propertyType: string; message: string; createdAt: string;
};

export default function MessagesTable({ initial }: { initial: Msg[] }) {
  const [items, setItems] = useState<Msg[]>(initial);
  const [open, setOpen] = useState<Msg | null>(null);

  async function del(id: string) {
    if (!confirm("Delete this message?")) return;
    const r = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (!r.ok) return toast.error("Failed to delete");
    setItems(items.filter(i => i._id !== id));
    setOpen(null);
    toast.success("Deleted");
  }

  if (items.length === 0) {
    return <div className="border border-forest-100 bg-white p-12 text-center text-forest-600">No messages yet.</div>;
  }

  return (
    <>
      <div className="border border-forest-100 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-forest-50 text-forest-700">
            <tr className="text-left">
              <Th>Date</Th><Th>Name</Th><Th>Email</Th><Th>Phone</Th><Th>Type</Th><Th>Message</Th><Th></Th>
            </tr>
          </thead>
          <tbody>
            {items.map(m => (
              <tr key={m._id} className="border-t border-forest-100 hover:bg-forest-50/40">
                <Td>{new Date(m.createdAt).toLocaleDateString()}</Td>
                <Td className="font-medium text-forest-950">{m.fullName}</Td>
                <Td>{m.email}</Td>
                <Td>{m.phone}</Td>
                <Td>{m.propertyType}</Td>
                <Td className="max-w-[280px] truncate">{m.message}</Td>
                <Td>
                  <div className="flex gap-2">
                    <button onClick={() => setOpen(m)} className="text-forest-700 hover:text-forest-500 text-xs underline">View</button>
                    <button onClick={() => del(m._id)} className="text-red-600 hover:text-red-700 text-xs underline">Delete</button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-forest-950/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="bg-white border border-forest-100 max-w-lg w-full p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs tracking-[0.2em] uppercase text-forest-600">{new Date(open.createdAt).toLocaleString()}</div>
                <h3 className="font-display text-3xl text-forest-950 mt-2">{open.fullName}</h3>
              </div>
              <button onClick={() => setOpen(null)} className="text-forest-600 text-xl">✕</button>
            </div>
            <Row label="Email" value={open.email} />
            <Row label="Phone" value={open.phone} />
            <Row label="Property type" value={open.propertyType} />
            <div className="mt-6">
              <div className="text-[10px] tracking-[0.25em] uppercase text-forest-600 mb-2">Message</div>
              <p className="text-forest-900 leading-relaxed whitespace-pre-wrap">{open.message}</p>
            </div>
            <button onClick={() => del(open._id)} className="mt-8 w-full border border-red-300 text-red-600 py-3 text-sm hover:bg-red-50">Delete message</button>
          </div>
        </div>
      )}
    </>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th className="px-4 py-3 text-[10px] tracking-[0.2em] uppercase font-medium">{children}</th>;
}
function Td({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top text-forest-800 ${className}`}>{children}</td>;
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-forest-100 py-2 text-sm">
      <span className="text-forest-600">{label}</span>
      <span className="text-forest-950">{value}</span>
    </div>
  );
}
