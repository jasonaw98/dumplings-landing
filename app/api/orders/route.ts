import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { PaymentStatus } from "@/lib/supabase/types";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const apiKey = process.env.ADMIN_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfigured" }, 
      { status: 500 }
    );
  }
  
  if (!authHeader || authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json(
      { error: "Unauthorized" }, 
      { status: 401 }
    );
  }
  
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 503 }
    );
  }
  const { searchParams } = new URL(req.url);
  const paymentStatus = searchParams.get("payment_status");
  const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

  let query = supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (paymentStatus && ["pending", "verified", "failed"].includes(paymentStatus)) {
    query = query.eq("payment_status", paymentStatus as PaymentStatus);
  }
  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
