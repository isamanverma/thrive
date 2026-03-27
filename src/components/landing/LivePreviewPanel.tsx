"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";

type Scenario = {
  id: "loading" | "empty" | "error" | "ready";
  title: string;
  description: string;
  mascot: string;
  cta: string;
};

const scenarios: Scenario[] = [
  {
    id: "loading",
    title: "Tuning Your Week",
    description: "Balancing prep time, fresh produce, and your routine.",
    mascot:
      "/thrive mascots/bgRemoved/checkmark on calendar with a meal Background Removed.png",
    cta: "Building plan",
  },
  {
    id: "empty",
    title: "No Pantry Inputs Yet",
    description: "Add what you already have and we build around it.",
    mascot: "/thrive mascots/bgRemoved/looking at fridge Background Removed.png",
    cta: "Add pantry items",
  },
  {
    id: "error",
    title: "One Ingredient Looks Off",
    description: "We could not verify one item. Quick fix and continue.",
    mascot: "/thrive mascots/bgRemoved/thinking Background Removed.png",
    cta: "Review item",
  },
  {
    id: "ready",
    title: "Plan Ready for Today",
    description: "Breakfast, lunch, and dinner mapped to your day.",
    mascot: "/thrive mascots/bgRemoved/eating salad Background Removed.png",
    cta: "Open today",
  },
];

const skeletonWidths = ["w-40", "w-full", "w-11/12", "w-9/12"];

function LivePreviewPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((value) => (value + 1) % scenarios.length);
    }, 3600);

    return () => clearInterval(timer);
  }, []);

  const active = useMemo(() => scenarios[index], [index]);

  return (
    <div className="rounded-[2.2rem] border border-emerald-100 bg-white/90 p-6 shadow-[0_26px_50px_-30px_rgba(22,101,52,0.35)] backdrop-blur-sm md:p-7">
      <div className="mb-5 flex items-center justify-between border-b border-emerald-100 pb-4">
        <p className="font-[var(--font-heading)] text-sm tracking-[0.14em] text-zinc-500 uppercase">
          Live Planner Preview
        </p>
        <motion.span
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="h-2.5 w-2.5 rounded-full bg-emerald-500"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-2">
              <Image
                src={active.mascot}
                alt={active.title}
                width={72}
                height={72}
                className="h-16 w-16 object-contain"
              />
            </div>
            <div>
              <h3 className="font-[var(--font-heading)] text-xl tracking-tight text-zinc-900">
                {active.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">{active.description}</p>
            </div>
          </div>

          {active.id === "loading" && (
            <div className="space-y-2">
              {skeletonWidths.map((widthClass, skeletonIndex) => (
                <motion.div
                  key={widthClass}
                  className={`h-3 rounded-full bg-zinc-200/90 ${widthClass}`}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.2,
                    delay: skeletonIndex * 0.12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}

          {active.id === "empty" && (
            <p className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 px-4 py-3 text-sm text-zinc-700">
              Start by dropping pantry ingredients and preferred cuisine.
            </p>
          )}

          {active.id === "error" && (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              Unable to classify one item. Replace or skip it to continue.
            </p>
          )}

          {active.id === "ready" && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                "7:30 AM Avocado toast",
                "12:45 PM Grain bowl",
                "7:15 PM Herb chicken",
                "Snack Yogurt + berries",
              ].map((meal) => (
                <div
                  key={meal}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700"
                >
                  {meal}
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-transform duration-200 hover:bg-emerald-700 active:scale-[0.98] active:-translate-y-[1px]"
          >
            {active.cta}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default memo(LivePreviewPanel);
