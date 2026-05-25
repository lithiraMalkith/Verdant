import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Contact } from "@/models/Contact";
import { getAdmin } from "@/lib/auth";

export async function GET() {
  if (!getAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const items = await Contact.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}
