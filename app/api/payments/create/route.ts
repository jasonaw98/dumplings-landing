import { NextResponse } from "next/server";
import { billplzFetch } from "@/lib/billplz";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { amount, email, name, mobile, origin, address, city, zip, items, totalPrice, referralCode } = await req.json();

    if (!amount || !email || !name || !mobile || !origin || !address || !city || !zip || !items || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderNumber = `#${Date.now().toString().slice(-8)}`;
    const orderDate = new Date().toLocaleDateString("en-MY", {
      dateStyle: "long",
    });

    const callbackUrl = origin
      ? `${origin}/api/payments/webhook`
      : `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`;

    const redirectUrl = origin
      ? `${origin}/checkout/success`
      : `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`;

    const bill = await billplzFetch("/api/v3/bills", {
      method: "POST",
      body: JSON.stringify({
        collection_id: process.env.BILLPLZ_COLLECTION_ID,
        amount: Math.round(amount * 100),
        email,
        mobile,
        name,
        callback_url: callbackUrl,
        description: `Order #${orderNumber} - For ${name}`,
        redirect_url: redirectUrl,
        reference_1_label: "Order ID",
        reference_1: orderNumber,
        reference_2_label: "Order Date",
        reference_2: orderDate,
      }),
    });

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 503 }
      );
    }

    const { error: orderError } = await supabaseAdmin.from("orders").insert({
      order_number: orderNumber,
      full_name: name,
      email,
      phone: mobile || null,
      address,
      city,
      zip,
      items,
      bill_url: bill.url,
      total_price: parseFloat(totalPrice),
      payment_status: "pending",
      referral_code: referralCode?.trim() || null,
    });
    if (orderError) {
      console.error("Supabase order insert error:", orderError);
    }

    return NextResponse.json({
      paymentUrl: bill.url,
    });
  } catch (error) {
    console.error("Error creating bill:", error);
    return NextResponse.json(
      { error: "Failed to create bill" },
      { status: 401 }
    );
  }
}
