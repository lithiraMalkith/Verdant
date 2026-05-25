import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const COOKIE = "ve_admin";

export function signAdmin(email: string) {
  return jwt.sign({ email, role: "admin" }, SECRET, { expiresIn: "7d" });
}

export function setAdminCookie(token: string) {
  cookies().set(COOKIE, token, {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearAdminCookie() { cookies().delete(COOKIE); }

export function getAdmin() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  try { return jwt.verify(token, SECRET) as { email: string; role: string }; }
  catch { return null; }
}
