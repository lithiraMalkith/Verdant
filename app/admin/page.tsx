import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";

export default function AdminIndex() {
  if (getAdmin()) redirect("/admin/dashboard");
  redirect("/admin/login");
}
