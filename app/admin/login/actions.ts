"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "node:crypto";

function getAdminToken(secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update("admin-session")
    .digest("hex");
}

export async function login(formData: FormData) {
  const password = formData.get("password");
  const raw = typeof password === "string" ? password.trim() : "";
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    return { error: "Admin not configured" };
  }
  if (raw !== secret) {
    return { error: "Invalid password" };
  }

  const token = getAdminToken(secret);
  const store = await cookies();
  store.set("admin_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  const from = formData.get("from");
  const redirectTo =
    typeof from === "string" && from.startsWith("/admin") ? from : "/admin";
  redirect(redirectTo);
}
