import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { ConfirmationEmail } from "@/components/email/ConfirmationEmail";

export async function POST(request: Request) {
  //   const body = await request.json();
  //   const { name, email, message } = body;

  //   if (!name || !email || !message) {
  //     return NextResponse.json(
  //       { message: 'Missing required fields' },
  //       { status: 400 }
  //     );
  //   }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailHtml = await render(ConfirmationEmail());

    // Define email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "@hotmail.com, leah_a_wang@hotmail.com",
      subject: `New message from `,
      html: emailHtml,
    };

    // Function to send the email
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
