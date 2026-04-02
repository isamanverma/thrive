"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

interface CalorieRingProps {
  consumed: number;
  target: number;
  size?: "sm" | "md";
}

const CIRCUMFERENCE = 2 * Math.PI * 48; // ≈ 301.59

export function CalorieRing({
  consumed,
  target,
  size = "md",
}: CalorieRingProps) {
  const progress = target > 0 ? Math.min(consumed / target, 1) : 0;
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
  }, [progress, animatedProgress]);

  const ringColor =
    progress >= 0.8
      ? "text-amber-500"
      : progress >= 0.5
        ? "text-amber-400"
        : "text-amber-300";

  const sizeClasses = size === "sm" ? "w-20 h-20" : "w-28 h-28";

  if (target === 0) {
    return (
      <div
        className={`${sizeClasses} flex flex-col items-center justify-center`}
      >
        <span className="text-2xl font-bold text-muted-foreground">—</span>
        <span className="text-xs text-muted-foreground mt-1">
          No target set
        </span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses} relative`}>
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
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
          }}
          className={ringColor}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-bold tabular-nums ${isOver ? "text-rose-500" : "text-foreground"} ${size === "sm" ? "text-lg" : "text-2xl"}`}
        >
          {consumed.toLocaleString()}
        </span>
        <span
          className={`text-muted-foreground tabular-nums ${size === "sm" ? "text-xs" : "text-sm"}`}
        >
          / {target.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
