import { NextResponse } from "next/server";
import { signAdmin, setAdminCookie, clearAdminCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@verdant.com";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = signAdmin(email);
  setAdminCookie(token);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  clearAdminCookie();
  return NextResponse.json({ ok: true });
}
