import type { Metadata } from "next";
import { Suspense } from "react";
import { Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { CartProvider } from "@/lib/cart-context";
import { CartSidebar } from "@/components/cart-sidebar";
import { ReferralCapture } from "@/components/referral-capture";
import { Toaster } from "@/components/ui/sonner"
import { LanguageProvider } from "@/lib/language-context";
import { Navbar } from "@/components/navbar";

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
      <Script src="/redirect.js" />
      <body className={`${outfit.className} antialiased`}>
        <Suspense fallback={null}>
          <ReferralCapture />
        </Suspense>
        <CartProvider>
          <LanguageProvider>
            <Navbar />
            {children}
          </LanguageProvider>
          <Toaster position="top-center" richColors />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
