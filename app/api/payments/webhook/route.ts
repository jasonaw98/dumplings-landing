import { NextResponse } from "next/server";
import crypto from "crypto";

// Store your XSignature Key securely (use environment variables)
const X_SIGNATURE_KEY = "S-";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    // Parse the raw body - Billplz sends data as URL-encoded form data
    const data = Object.fromEntries(new URLSearchParams(rawBody));
    console.log("This is data from webhook", data);

    // Extract x_signature from the data
    const { x_signature, ...paramsWithoutSignature } = data;
    
    // Verify the signature
    const isValidSignature = verifyBillplzSignature(paramsWithoutSignature, x_signature);

    if (!isValidSignature) {
      console.error("Invalid signature detected");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 200 }
      );
    }

    console.log("Signature verified successfully");

    const paid = paramsWithoutSignature.paid === "true";
    const state = paramsWithoutSignature.state;

    if (paid && state === "paid") {
      console.log("Transaction successful");

      return NextResponse.json({
        success: true,
        message: "Payment successful",
        billId: paramsWithoutSignature.id,
        amount: paramsWithoutSignature.amount,
        paidAt: paramsWithoutSignature.paid_at
      });
    } else if (state === "failed" || state === "unpaid") {
      console.log("Transaction failed or unpaid");
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

// Helper function to verify Billplz signature
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

    console.log("Sorted key+value strings:");
    sortedKeyValueStrings.forEach(str => console.log(str));

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