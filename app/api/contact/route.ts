import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Contact } from "@/models/Contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, propertyType, message } = body || {};
    if (!fullName || !email || !phone || !propertyType || !message)
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(email))
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });

    await dbConnect();
    const doc = await Contact.create({ fullName, email, phone, propertyType, message });
    return NextResponse.json({ ok: true, id: doc._id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
