import { NextResponse } from "next/server";
import { Bot, InputFile } from "grammy";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("receipt") as File | null;
    const orderId = formData.get("orderId")?.toString();
    const totalPrice = formData.get("totalPrice")?.toString();
    const items = formData.get("items")?.toString();
    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const address = formData.get("address")?.toString();
    const city = formData.get("city")?.toString();
    const zip = formData.get("zip")?.toString();

    if (!file || !firstName || !lastName || !address || !city || !zip || !totalPrice || !items) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 401 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 5MB)" },
        { status: 400 }
      );
    }

    // Convert File → Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Send as DOCUMENT to avoid compression
    await bot.api.sendDocument(
      process.env.TELEGRAM_ADMIN_CHAT_ID!,
      new InputFile(buffer, file.name),
      {
        caption: `
🧾 *New Order Payment*
━━━━━━━━━━━━━━
File: *${file.name}*
Name: *${firstName} ${lastName}*
Address: *${address}*
City: *${city}*
Zip: *${zip}*
Total Price: *RM ${totalPrice}*
Items: *\n${items}*

*${new Date().toLocaleString()}*
        `,
        parse_mode: "Markdown",
      }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Receipt upload error:", err);
    return NextResponse.json(
      { error: "Failed to upload receipt" },
      { status: 500 }
    );
  }
}
