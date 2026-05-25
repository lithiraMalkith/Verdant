"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    toast.success("Signed out");
    router.push("/admin/login");
  }
  return (
    <button onClick={logout} className="text-xs tracking-[0.2em] uppercase border border-forest-300 px-4 py-2 hover:bg-forest-900 hover:text-white hover:border-forest-900">
      Sign out
    </button>
  );
}
