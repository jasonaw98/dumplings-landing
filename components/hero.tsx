"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center bg-orange-50 relative overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center md:text-left z-10"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-6">
            ✨ Not Your Grandma's Dumplings
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Dumplings with <br />
            <span className="text-orange-500">Personality</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Handcrafted daily, bursting with flavor, and served with a side of
            joy. Experience the cutest dumplings in town!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full text-lg h-14 px-8"
            >
              View Menu
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-lg h-14 px-8 border-orange-200 hover:bg-orange-50 text-orange-700"
            >
              Our Locations <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative h-[500px] w-full"
        >
          <Image
            src="/hero-dumplings.png"
            alt="Cute dumplings in a steamer"
            fill
            className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            priority
          />
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl z-0" />
    </section>
  );
}
