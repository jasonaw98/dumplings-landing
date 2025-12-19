"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const dumplings = [
  { src: "/dumpling-1.png", size: 100, x: "10%", delay: 0 },
  { src: "/dumpling-2.png", size: 100, x: "85%", delay: 0.5 },
  { src: "/dumpling-3.png", size: 100, x: "15%", delay: 1.2 },
  { src: "/dumpling-1.png", size: 100, x: "80%", delay: 2 },
  { src: "/dumpling-2.png", size: 100, x: "15%", delay: 2.8 },
  { src: "/dumpling-3.png", size: 100, x: "90%", delay: 3.5 },
];

export function FloatingDumplings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-40 h-full w-full"
    >
      {dumplings.map((item, index) => {
        // Different movement speeds for parallax effect
        // Some move faster (larger range), some slower
        const yRange = [(index + 1) * 100, (index + 1) * -400];
        const rotateRange = [0, 360 * (index % 2 === 0 ? 1 : -1)]; // Some roll right, some left

        const y = useTransform(smoothProgress, [0, 1], yRange);
        const rotate = useTransform(smoothProgress, [0, 1], rotateRange);

        return (
          <motion.div
            key={index}
            className={index === 0 ? "hidden md:block" : ""}
            style={{
              position: "absolute",
              left: item.x,
              top: `${index * 15 + 1}%`, // Distribute vertically
              y,
              rotate,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 1, delay: item.delay }}
          >
            <div
              style={{
                width: item.size,
                height: item.size,
                position: "relative",
              }}
            >
              <Image
                src={item.src}
                alt="Floating dumpling"
                fill
                className="object-contain drop-shadow-lg rounded-2xl"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
