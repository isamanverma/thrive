"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

type MascotItem = {
  src: string;
  alt: string;
  size: string;
  drift: number;
  delay: number;
};

const mascots: MascotItem[] = [
  {
    src: "/thrive mascots/bgRemoved/saying hello Background Removed.png",
    alt: "Thrive mascot greeting",
    size: "h-28 w-28 md:h-36 md:w-36",
    drift: 12,
    delay: 0,
  },
  {
    src: "/thrive mascots/bgRemoved/cooking Background Removed.png",
    alt: "Thrive mascot cooking",
    size: "h-24 w-24 md:h-32 md:w-32",
    drift: 10,
    delay: 0.25,
  },
  {
    src: "/thrive mascots/bgRemoved/scanning calories of a meal on phone Background Removed.png",
    alt: "Thrive mascot tracking meal",
    size: "h-24 w-24 md:h-28 md:w-28",
    drift: 8,
    delay: 0.5,
  },
  {
    src: "/thrive mascots/bgRemoved/relaxing with a coffee Background Removed.png",
    alt: "Thrive mascot relaxing",
    size: "h-24 w-24 md:h-28 md:w-28",
    drift: 10,
    delay: 0.35,
  },
  {
    src: "/thrive mascots/bgRemoved/thumbs up Background Removed.png",
    alt: "Thrive mascot encouraging",
    size: "h-24 w-24 md:h-28 md:w-28",
    drift: 9,
    delay: 0.6,
  },
];

function MascotOrbit() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {mascots.map((item, index) => (
        <motion.div
          key={item.src}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -item.drift, 0],
            rotate: [0, index % 2 === 0 ? -2 : 2, 0],
          }}
          transition={{
            opacity: { duration: 0.4, delay: index * 0.12 },
            y: {
              duration: 4.8 + index * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: item.delay,
            },
            rotate: {
              duration: 5.5 + index * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: item.delay,
            },
          }}
          className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white/90 p-3 shadow-[0_20px_45px_-28px_rgba(22,101,52,0.28)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_55%)]" />
          <Image
            src={item.src}
            alt={item.alt}
            width={180}
            height={180}
            className={`${item.size} mx-auto object-contain will-change-transform transition-transform duration-300 group-hover:scale-105`}
            priority={index < 2}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default memo(MascotOrbit);
