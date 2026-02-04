import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import { ConfirmationEmail } from "@/components/email/ConfirmationEmail";

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];

const X_SIGNATURE_KEY = process.env.BILLPLZ_X_SIGNATURE_KEY!;

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    const data = Object.fromEntries(new URLSearchParams(rawBody));
    console.log("This is data from webhook", data);

    const { x_signature, ...paramsWithoutSignature } = data;

    const isValidSignature = verifyBillplzSignature(paramsWithoutSignature, x_signature);

    if (!isValidSignature) {
      console.error("Invalid signature detected");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 200 }
      );
    }

    console.log("Signature verified successfully ✅");

    const paid = paramsWithoutSignature.paid === "true";
    const state = paramsWithoutSignature.state;

    if (paid && state === "paid") {
      console.log("Transaction successful");

      if (!supabaseAdmin) {
        return NextResponse.json(
          { error: "Supabase not configured" },
          { status: 503 }
        );
      }

      const billUrl = paramsWithoutSignature.url;

      const { data, error: fetchError } = await supabaseAdmin
        .from("orders")
        .select("*")
        .eq("bill_url", billUrl)
        .single();
      const order = data as OrderRow | null;

      const { error: orderError } = await supabaseAdmin.from("orders").update({
        payment_status: "verified",
      }).eq("bill_url", billUrl);
      if (orderError) {
        console.error("Supabase order update error:", orderError);
      }

      if (order && !fetchError) {
        const orderDate = order.created_at
          ? new Date(order.created_at).toLocaleDateString("en-MY", { dateStyle: "long" })
          : new Date().toLocaleDateString("en-MY", { dateStyle: "long" });

        const transporter = nodemailer.createTransport({
          service: "gmail",
          port: 587,
          host: "smtp.gmail.com",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const emailHtml = await render(
          ConfirmationEmail({
            orderNumber: order.order_number,
            fullName: order.full_name,
            email: order.email,
            phone: order.phone ?? undefined,
            address: order.address,
            city: order.city,
            zip: order.zip,
            orderDate,
            items: order.items ?? [],
            totalPrice: Number(order.total_price),
            baseUrl: process.env.NEXT_PUBLIC_SITE_URL ||
              (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined),
          })
        );

        const mailOptions = {
          from: `Dumpling Bois <${process.env.SMTP_USER}>`,
          to: order.email,
          subject: `Your Dumpling Bois order is confirmed. Thank you, ${order.full_name}!`,
          html: emailHtml,
        };

        await transporter.sendMail(mailOptions).catch((err) => {
          console.error("Failed to send confirmation email:", err);
        });
      } else {
        console.warn("Order not found for bill_url, skipping confirmation email. Bill id:", paramsWithoutSignature.id);
      }

      return NextResponse.json({
        success: true,
        message: "Payment successful",
        billId: paramsWithoutSignature.id,
        amount: paramsWithoutSignature.amount,
      });
    } else if (state === "failed" || state === "due") {
      console.log("Transaction failed or due");
      return NextResponse.json({
        success: false,
        message: "Payment failed",
        billId: paramsWithoutSignature.id,
        state: state
      });
    } else {
      console.log("Transaction status unknown:", state);
      return NextResponse.json({
        success: false,
        message: "Unknown transaction status",
        state: state
      });
    }

  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}

export function verifyBillplzSignature(params: Record<string, string>, receivedSignature: string): boolean {
  try {
    // Step 1: Construct key+value strings for all parameters
    const keyValueStrings: string[] = [];

    for (const [key, value] of Object.entries(params)) {
      // Skip x_signature if it's somehow in params
      if (key === 'x_signature') continue;

      // Use empty string for null/undefined
      const cleanValue = value || "";
      keyValueStrings.push(key + cleanValue);
    }

    // Step 2: Sort the concatenated strings (case-insensitive as per documentation)
    const sortedKeyValueStrings = keyValueStrings.sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );

    // Step 3: Combine with "|" separator
    const sourceString = sortedKeyValueStrings.join("|");
    console.log("Constructed source string:", sourceString);

    // Step 4: Compute HMAC-SHA256
    const computedSignature = crypto
      .createHmac("sha256", X_SIGNATURE_KEY)
      .update(sourceString)
      .digest("hex");

    console.log("Computed signature:", computedSignature);
    console.log("Received signature:", receivedSignature);

    // Step 5: Compare signatures (use constant-time comparison for security)
    return crypto.timingSafeEqual(
      Buffer.from(computedSignature, 'hex'),
      Buffer.from(receivedSignature, 'hex')
    );

  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
}