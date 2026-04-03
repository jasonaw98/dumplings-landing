"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="story" className="py-24 bg-orange-50 overflow-hidden">
      <div className="container mx-auto px-4 space-y-16">
        <Story />
        <Diff />
        <Perfect />
      </div>
    </section>
  );
}

function Story() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-16">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="md:w-1/2"
      >
        <div className="relative rounded-3xl shadow-2xl overflow-hidden">
          <Image
            src="/gallery/third.png"
            alt="Chefs making dumplings"
            width={600}
            height={400}
            className="object-cover w-full h-full transform scale-105 hover:scale-115 transition-transform duration-700"
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
          From one stall to <br />
          <span className="text-orange-500">Three Locations </span>- and
          Counting!
        </h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Dumpling Bois started with a simple mission – serve great, high
          quality, pork-free dumplings that everyone can enjoy.
        </p>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          As we expanded to 3 locations, and now our online store, one thing has
          never changed – our commitment to quality, consistency, and flavour.
        </p>
      </motion.div>
    </div>
  );
}

function Diff() {
  return (
    <div className="flex flex-col md:flex-row-reverse items-center gap-16">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="md:w-1/2"
      >
        <div className="relative rounded-3xl shadow-2xl overflow-hidden">
          <Image
            src="/gallery/central.jpeg"
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
          1 Central Kitchen. 3 Locations.
          <span className="text-orange-500"> 1 Standard.</span>
        </h2>
        <div className="text-lg text-gray-600 mb-6 leading-relaxed">
          <ul className="list-disc list-inside">
            <li>Fresh ingredients prepared daily.</li>
            <li>Consistent & balanced seasoning – not overpowering</li>
            <li>Generous fillings without excess oil</li>
            <li>No compromise on standards.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

function Perfect() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-16">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="md:w-1/2"
      >
        <div className="relative rounded-3xl shadow-2xl overflow-hidden">
          <Image
            src="/plated.jpg"
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
          <span className="text-orange-500">Perfect for Home</span>
          <br /> No matter the occasion.
        </h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Whether you are fixing a quick lunch, family dinner, or stocking
          up your freezer. <br/>
          Best served hot *chef kiss*
        </p>
      </motion.div>
    </div>
  );
}
