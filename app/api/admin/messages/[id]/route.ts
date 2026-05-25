import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Contact } from "@/models/Contact";
import { getAdmin } from "@/lib/auth";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (!getAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  await Contact.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
