"use client";

import { motion } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-orange-600 flex items-center gap-2"
        >
          <span>🥟</span> Happy Dumplings
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <Link
            href="#menu"
            className="hover:text-orange-500 transition-colors"
          >
            Menu
          </Link>
          <Link
            href="#story"
            className="hover:text-orange-500 transition-colors"
          >
            Our Story
          </Link>
          <Link
            href="#locations"
            className="hover:text-orange-500 transition-colors"
          >
            Locations
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
            <ShoppingBag className="mr-2 h-4 w-4" /> Order Now
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
