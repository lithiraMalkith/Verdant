"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@verdant.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Login failed");
      toast.success("Welcome back.");
      router.push("/admin/dashboard");
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-white">
      <form onSubmit={submit} className="w-full max-w-md border border-forest-100 p-10 bg-white">
        <div className="text-xs tracking-[0.3em] uppercase text-forest-600 mb-3">Admin</div>
        <h1 className="font-display text-4xl text-forest-950 mb-8">Sign in</h1>
        <label className="block mb-5">
          <span className="block text-[10px] tracking-[0.25em] uppercase text-forest-600 mb-1">Email</span>
          <input className="w-full border-b border-forest-200 focus:border-forest-500 outline-none py-2 bg-transparent" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="block mb-8">
          <span className="block text-[10px] tracking-[0.25em] uppercase text-forest-600 mb-1">Password</span>
          <input type="password" className="w-full border-b border-forest-200 focus:border-forest-500 outline-none py-2 bg-transparent" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button disabled={loading} className="w-full bg-forest-900 text-white py-3 text-sm tracking-wide hover:bg-forest-700 disabled:opacity-60">
          {loading ? "Signing in..." : "Sign in →"}
        </button>
        <p className="mt-6 text-xs text-forest-600">Default: admin@verdant.com / admin123 (set via env)</p>
      </form>
    </main>
  );
}
