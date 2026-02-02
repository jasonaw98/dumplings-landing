import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { ConfirmationEmail } from "@/components/email/ConfirmationEmail";

export async function POST(req: Request) {
  const formData = await req.formData();

  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();
  const totalPrice = formData.get("totalPrice")?.toString();
  const itemsJson = formData.get("itemsJson")?.toString();
  const firstName = formData.get("firstName")?.toString();
  const address = formData.get("address")?.toString();
  const city = formData.get("city")?.toString();
  const zip = formData.get("zip")?.toString();

  if (!email || !firstName || !address || !city || !zip || !totalPrice) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  let items: { id: number; name: string; price: number; image: string; quantity: number }[] = [];
  if (itemsJson) {
    try {
      items = JSON.parse(itemsJson);
    } catch {
      const itemsStr = formData.get("items")?.toString();
      if (itemsStr) {
        items = itemsStr.split("\n").map((line) => {
          const [name, qty] = line.split(" x ").map((s) => s.trim());
          return {
            id: 0,
            name: name || "Item",
            price: 0,
            image: "",
            quantity: parseInt(qty || "1", 10) || 1,
          };
        });
      }
    }
  }

  const orderNumber = `#${Date.now().toString().slice(-8)}`;
  const orderDate = new Date().toLocaleDateString("en-MY", { dateStyle: "long" });

  try {
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
        orderNumber,
        firstName,
        email,
        phone: phone ?? undefined,
        address,
        city,
        zip,
        orderDate,
        items,
        totalPrice: parseFloat(totalPrice),
        baseUrl: process.env.NEXT_PUBLIC_SITE_URL ||
          (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined),
      })
    );

    const mailOptions = {
      from: `Dumpling Bois <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your Dumpling Bois order is confirmed. Thank you, ${firstName}!`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 },
    );
  }
}
