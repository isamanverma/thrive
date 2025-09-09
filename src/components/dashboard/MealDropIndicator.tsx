"use client";

import { motion } from "framer-motion";

interface MealDropIndicatorProps {
  beforeId: string | null;
  mealType: string;
  dayIndex: number;
}

export const MealDropIndicator = ({
  beforeId,
  mealType,
  dayIndex,
}: MealDropIndicatorProps) => {
  return (
    <motion.div
      data-before={beforeId || "-1"}
      data-meal-type={mealType}
      data-day-index={dayIndex}
      data-drop-indicator="true"
      className="my-1 h-0.5 w-full bg-green-400 opacity-0 rounded-full"
      initial={{ scaleX: 0, scaleY: 0 }}
      animate={{
        scaleX: 1,
        scaleY: 1,
      }}
      style={{
        transformOrigin: "center",
      }}
      transition={{
        duration: 0.15,
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    />
  );
};
