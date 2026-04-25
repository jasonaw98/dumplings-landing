"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const store = await cookies();
  store.delete("admin_session");
  redirect("/admin/login");
}

export async function refreshData() {
  revalidatePath("/admin");
}
