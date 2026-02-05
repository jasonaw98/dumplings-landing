"use client";

import { motion } from "framer-motion";
import { Home, SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white pt-12 pb-12 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6"
          >
            <SearchX className="w-12 h-12 text-orange-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Page not found
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            This page doesn’t exist or may have been moved. Head back home for
            some dumplings.
          </p>

          <Link href="/" className="inline-block">
            <Button className="h-12 px-6 text-lg bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
