"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { type ReactNode } from "react";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function MagneticButton({
  href,
  children,
  className,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(springY, [-14, 14], [2, -2]);
  const rotateY = useTransform(springX, [-14, 14], [-2, 2]);

  return (
    <motion.div
      style={{ x: springX, y: springY, rotateX, rotateY }}
      onMouseMove={(event) => {
        const target = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - (target.left + target.width / 2);
        const offsetY = event.clientY - (target.top + target.height / 2);

        x.set(offsetX * 0.12);
        y.set(offsetY * 0.12);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="[transform-style:preserve-3d]"
    >
      <Link
        href={href}
        className={className}
      >
        {children}
      </Link>
    </motion.div>
  );
}
