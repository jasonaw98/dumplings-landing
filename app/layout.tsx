import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { CartProvider } from "@/lib/cart-context";
import { CartSidebar } from "@/components/cart-sidebar";
import { Toaster } from "@/components/ui/sonner"

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
      <Script
        defer
        src="https://umami-jason.vercel.app/script.js"
        data-website-id="0e4ed64e-66bc-4488-be07-70d07b4e7b2c"
      />
      <body className={`${outfit.className} antialiased`}>
        <CartProvider>
          {children}
          <Toaster position="top-center" richColors/>
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
