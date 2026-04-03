"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCart } from "@/lib/cart-context";
import { Switch } from "./ui/switch";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const { language, setLanguage } = useLanguage();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-md text-center md:text-2xl font-bold text-orange-600 flex items-center gap-2"
          >
            <img src="/logo.png" alt="Dumpling Bois" className="w-10 h-10" />{" "}
            Dumpling Bois
          </Link>
          <div className="flex items-center gap-1 text-sm md:text-base">
            <span
              className={cn(
                language === "en" ? "text-orange-500" : "text-gray-500",
                "font-semibold",
              )}
            >
              EN
            </span>
            <Switch
              checked={language === "bm"}
              onCheckedChange={() =>
                setLanguage(language === "bm" ? "en" : "bm")
              }
              className="data-checked:bg-orange-500 data-unchecked:bg-gray-200"
            />
            <span
              className={cn(
                language === "bm" ? "text-orange-500" : "text-gray-500",
                "font-semibold",
              )}
            >
              BM
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <Link
            href="/#menu"
            className="hover:text-orange-500 transition-colors"
          >
            Menu
          </Link>
          <Link
            href="/#story"
            className="hover:text-orange-500 transition-colors"
          >
            Our Story
          </Link>
          <Link
            href="/#locations"
            className="hover:text-orange-500 transition-colors"
          >
            Locations
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full relative"
            onClick={toggleCart}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-b border-orange-100 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4 font-medium text-gray-700">
            <Link
              href="/#menu"
              className="hover:text-orange-500 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/#story"
              className="hover:text-orange-500 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="/#locations"
              className="hover:text-orange-500 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Locations
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
