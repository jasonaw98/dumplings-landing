import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get("order_number");

  if (!orderNumber?.trim()) {
    return NextResponse.json(
      { error: "Missing order_number or ref" },
      { status: 400 }
    );
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 503 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("order_number, full_name, email, created_at, items, total_price")
    .eq("order_number", orderNumber.trim())
    .eq("payment_status", "verified")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
