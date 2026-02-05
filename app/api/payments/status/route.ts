import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get("order_number");

  if (!orderNumber?.trim()) {
    return NextResponse.json(
      { error: "Missing order_number" },
      { status: 400 }
    );
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 503 }
    );
  }

  try {
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("payment_status")
      .eq("order_number", orderNumber.trim())
      .single();

    if (error || !order) {
      return NextResponse.json(
        { paid: false, order_number: orderNumber },
        { status: 200 }
      );
    }

    return NextResponse.json({
      paid: order.payment_status === "verified",
      order_number: orderNumber,
    });
  } catch (err) {
    console.error("Error checking payment status:", err);
    return NextResponse.json(
      { error: "Could not verify payment status" },
      { status: 500 }
    );
  }
}
