"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="story" className="py-24 bg-orange-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-dumplings.png" // Reusing hero image for now, but cropped/styled differently
                alt="Chefs making dumplings"
                width={600}
                height={400}
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Made with Love & <br />A Little Bit of Magic
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We believe dumplings should be more than just food—they should be
              an experience. Inspired by traditional recipes but twisted with
              modern creativity, our dumplings are designed to make you smile.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you're grabbing a quick bite or sitting down with friends,
              we promise fresh ingredients, bold flavors, and good vibes only.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
