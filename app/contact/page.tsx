"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const PROPERTY_TYPES = ["Villa", "Apartment", "Penthouse", "Cottage", "Estate", "Other"];

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", propertyType: "Villa", message: "" });
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm(f => ({ ...f, [k]: v }));
  }

  function validate() {
    if (form.fullName.trim().length < 2) return "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (form.phone.trim().length < 6) return "Please enter a valid phone number.";
    if (form.message.trim().length < 10) return "Message should be at least 10 characters.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) return toast.error(err);
    setLoading(true);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Failed to send");
      toast.success("Message sent. We'll be in touch.");
      setForm({ fullName: "", email: "", phone: "", propertyType: "Villa", message: "" });
    } catch (e: any) {
      toast.error(e.message);
    } finally { setLoading(false); }
  }

  return (
    <main className="pt-32 pb-24 px-6 md:px-14 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <div className="text-xs tracking-[0.3em] text-forest-600 uppercase mb-4">Get in touch</div>
          <h1 className="font-display text-6xl md:text-7xl text-forest-950 leading-[0.95] mb-8">
            Tell us about the<br />home you imagine.
          </h1>
          <p className="text-forest-700 leading-relaxed max-w-md">
            Share a few details and one of our agents will respond within two business days,
            often with a quiet list of options you won't find elsewhere.
          </p>
          <div className="mt-10 space-y-3 text-sm text-forest-700">
            <div><span className="text-forest-500 mr-2">→</span> hello@verdant-estates.com</div>
            <div><span className="text-forest-500 mr-2">→</span> +1 (415) 555-0102</div>
            <div><span className="text-forest-500 mr-2">→</span> Mon–Fri, 9–6 PT</div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="border border-forest-100 p-8 md:p-10 bg-white">
          <Field label="Full name">
            <input value={form.fullName} onChange={e => update("fullName", e.target.value)} className={inputCls} placeholder="Jane Doe" />
          </Field>
          <Field label="Email">
            <input type="email" value={form.email} onChange={e => update("email", e.target.value)} className={inputCls} placeholder="jane@example.com" />
          </Field>
          <Field label="Phone">
            <input value={form.phone} onChange={e => update("phone", e.target.value)} className={inputCls} placeholder="+1 555 0100" />
          </Field>
          <Field label="Property type">
            <select value={form.propertyType} onChange={e => update("propertyType", e.target.value)} className={inputCls}>
              {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Message">
            <textarea rows={5} value={form.message} onChange={e => update("message", e.target.value)} className={inputCls} placeholder="Tell us a little about what you're looking for..." />
          </Field>
          <button
            disabled={loading}
            className="mt-2 w-full bg-forest-900 text-white py-4 text-sm tracking-wide hover:bg-forest-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send message →"}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputCls = "w-full bg-transparent border-0 border-b border-forest-200 focus:border-forest-500 outline-none py-3 text-forest-950 placeholder-forest-300";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-6">
      <span className="block text-[10px] tracking-[0.25em] uppercase text-forest-600 mb-1">{label}</span>
      {children}
    </label>
  );
}
