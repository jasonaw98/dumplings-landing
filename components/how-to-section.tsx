"use client";

import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

const uiText = {
  en: {
    title: "How to Cook",
    subtitle: "Watch how we like to cook our dumplings",
  },
  bm: {
    title: "Cara Memasak",
    subtitle: "Tonton cara kami memasak dumpling",
  },
};

export function HowToSection() {
  const { language } = useLanguage();
  const text = uiText[language];

  return (
    <section id="how" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{text.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{text.subtitle}</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-black"
        >
          <video
            src="/how/pan-fried.mp4"
            controls
            className="w-full aspect-video object-contain"
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
}
