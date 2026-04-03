"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

function DumplingCounter() {
  const START_DATE = new Date("2024-10-01").getTime();
  const DUMPLINGS_PER_MONTH = 8000;
  const MS_PER_MONTH = 30 * 24 * 60 * 60 * 1000;

  const [targetCount, setTargetCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const elapsed = Date.now() - START_DATE;
      setTargetCount(
        Math.floor(elapsed * (DUMPLINGS_PER_MONTH / MS_PER_MONTH))
      );
    };

    updateCount();
    const interval = setInterval(updateCount, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (targetCount > 0) {
      const controls = animate(count, targetCount, {
        duration: 2.5,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [targetCount, count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
      className="absolute md:bottom-10 left-16 md:-left-32 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-2xl border border-white/50 flex items-center gap-4 z-20 pointer-events-none hover:scale-105 transition-transform duration-300"
    >
      <div className="bg-orange-100 p-3 rounded-full flex shrink-0">
        <TrendingUp className="w-6 h-6 text-orange-500" />
      </div>
      <div>
        <div className="text-3xl font-black text-gray-900 tracking-tight flex items-baseline gap-1">
          <motion.span>{rounded}</motion.span>
          <span className="text-orange-500">+</span>
        </div>
        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Dumplings Sold
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="min-h-screen pt-24 pb-12 px-4 md:px-30 flex flex-col items-center justify-center bg-orange-50 relative overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 items-center">
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
            <a href="#menu">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full text-lg h-14 px-8"
              >
                View Menu
              </Button>
            </a>
            <a href="#locations">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-orange-200 text-lg h-14 px-8 border-orange-200 hover:bg-orange-50 text-orange-700"
              >
                Our Locations <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative h-[500px] w-full mt-12 md:mt-0"
        >
          <Image
            src="/full_steam.png"
            alt="Cute dumplings in a steamer"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="drop-shadow-2xl hover:scale-115 transition-transform duration-500 rounded-3xl scale-105 object-contain"
            priority
          />
          <DumplingCounter />
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-yellow-200/40 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl z-0 pointer-events-none" />
    </section>
  );
}
