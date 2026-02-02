import { NextResponse } from "next/server";
import { billplzFetch } from "@/lib/billplz";

export async function POST(req: Request) {
  const { amount, email, name, mobile, origin } = await req.json();

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

  return NextResponse.json({
    paymentUrl: bill.url,
  });
}
