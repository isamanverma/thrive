"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

interface CalorieRingProps {
  consumed: number;
  target: number;
}

const CIRCUMFERENCE = 2 * Math.PI * 48;
const SIZE_CLASSES = "w-20 h-20 md:w-28 md:h-28";

export function CalorieRing({ consumed, target }: CalorieRingProps) {
  const clampedConsumed = Math.max(0, consumed);
  const progress = target > 0 ? Math.min(clampedConsumed / target, 1) : 0;
  const isOver = consumed > target;

  const animatedProgress = useSpring(0, {
    stiffness: 80,
    damping: 16,
  });

  const strokeDashoffset = useTransform(
    animatedProgress,
    (p) => CIRCUMFERENCE * (1 - p),
  );

  useEffect(() => {
    animatedProgress.set(progress);
  }, [progress]);

  const ringColor = isOver
    ? "text-rose-500"
    : progress >= 0.8
      ? "text-amber-500"
      : progress >= 0.5
        ? "text-amber-400"
        : "text-amber-300";

  if (target === 0) {
    return (
      <div
        className={`${SIZE_CLASSES} flex flex-col items-center justify-center`}
      >
        <span className="text-lg md:text-2xl font-bold text-muted-foreground">
          —
        </span>
        <span className="text-xs text-muted-foreground mt-1">
          No target set
        </span>
      </div>
    );
  }

  return (
    <div className={`${SIZE_CLASSES} relative`}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/10"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{
            strokeDashoffset,
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
          className={ringColor}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-bold tabular-nums ${isOver ? "text-rose-500" : "text-foreground"} text-lg md:text-2xl`}
        >
          {clampedConsumed.toLocaleString()}
        </span>
        <span className="text-muted-foreground tabular-nums text-xs md:text-sm">
          / {target.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
