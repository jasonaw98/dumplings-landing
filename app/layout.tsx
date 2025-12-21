import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Dumpling Bois | Not Your Grandma's Bao",
  description: "Modern, cute, and delicious dumplings crafted with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          defer
          src="https://umami-jason.vercel.app/script.js"
          data-website-id="0e4ed64e-66bc-4488-be07-70d07b4e7b2c"
        ></script>
      </head>
      <body className={`${outfit.className} antialiased`}>{children}</body>
    </html>
  );
}
