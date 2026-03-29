"use client";

import { useState, useCallback } from "react";
import { useActiveIndex } from "@/hooks/useActiveIndex";
import { useInView } from "@/hooks/useInView";

type DayPlan = {
  day: string;
  meal: string;
  workout: string;
  cal: number;
  workoutType: string;
};

const fatLossPlan: DayPlan[] = [
  {
    day: "Mon",
    meal: "High protein",
    cal: 1800,
    workout: "Push day · 55 min",
    workoutType: "Push",
  },
  {
    day: "Tue",
    meal: "Moderate carbs",
    cal: 1700,
    workout: "Pull day · 50 min",
    workoutType: "Pull",
  },
  {
    day: "Wed",
    meal: "Low calorie",
    cal: 1600,
    workout: "Rest · mobility",
    workoutType: "Recovery",
  },
  {
    day: "Thu",
    meal: "High protein",
    cal: 1800,
    workout: "Legs · 60 min",
    workoutType: "Legs",
  },
  {
    day: "Fri",
    meal: "Balanced",
    cal: 1750,
    workout: "Upper body · 45 min",
    workoutType: "Upper",
  },
  {
    day: "Sat",
    meal: "Flexible",
    cal: 1700,
    workout: "Active recovery · walk",
    workoutType: "Walk",
  },
  {
    day: "Sun",
    meal: "Meal prep",
    cal: 1750,
    workout: "Rest day",
    workoutType: "Rest",
  },
];

const muscleGainPlan: DayPlan[] = [
  {
    day: "Mon",
    meal: "High protein",
    cal: 2800,
    workout: "Push day · 60 min",
    workoutType: "Push",
  },
  {
    day: "Tue",
    meal: "High carbs",
    cal: 2700,
    workout: "Pull day · 55 min",
    workoutType: "Pull",
  },
  {
    day: "Wed",
    meal: "Moderate",
    cal: 2500,
    workout: "Rest · stretching",
    workoutType: "Recovery",
  },
  {
    day: "Thu",
    meal: "High protein",
    cal: 2800,
    workout: "Legs · 65 min",
    workoutType: "Legs",
  },
  {
    day: "Fri",
    meal: "High carbs",
    cal: 2700,
    workout: "Upper body · 50 min",
    workoutType: "Upper",
  },
  {
    day: "Sat",
    meal: "Flexible",
    cal: 2600,
    workout: "Active recovery · swim",
    workoutType: "Swim",
  },
  {
    day: "Sun",
    meal: "Meal prep",
    cal: 2650,
    workout: "Rest day",
    workoutType: "Rest",
  },
];

const planLabels = ["Fat Loss", "Muscle Gain"] as const;
type PlanMode = (typeof planLabels)[number];

export default function WeekGlanceSection() {
  const [mode, setMode] = useState<PlanMode>("Fat Loss");
  const plan = mode === "Fat Loss" ? fatLossPlan : muscleGainPlan;
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  const { index: activeDay, setIndexTo } = useActiveIndex({
    length: 7,
    intervalMs: 1500,
    autoStart: false,
  });

  // Start cycling when section enters view
  const [hasStarted, setHasStarted] = useState(false);
  if (inView && !hasStarted) {
    setHasStarted(true);
  }

  const handleDayClick = useCallback(
    (i: number) => {
      setIndexTo(i);
      if (!hasStarted) setHasStarted(true);
    },
    [setIndexTo, hasStarted],
  );

  return (
    <section ref={ref} className="px-5 py-28 sm:px-6 lg:px-8 lg:py-36">
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          your week
        </p>
        <h2 className="mt-3 text-balance text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.02] tracking-tight text-foreground">
          your week, already planned
        </h2>

        {/* Mode toggle */}
        <div className="mt-8 inline-flex rounded-full border border-border bg-card p-1">
          {planLabels.map((label) => (
            <button
              key={label}
              onClick={() => setMode(label)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                mode === label
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Week card */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-[0_20px_60px_-40px_rgba(234,88,12,0.2)] dark:shadow-[0_20px_60px_-40px_rgba(234,88,12,0.3)] sm:p-8">
          <div className="space-y-1">
            {plan.map((row, i) => (
              <button
                key={row.day}
                onClick={() => handleDayClick(i)}
                className={`group flex w-full flex-col gap-1 rounded-xl px-4 py-3 text-left transition-all duration-300 sm:flex-row sm:items-center sm:gap-6 ${
                  activeDay === i
                    ? "scale-[1.01] bg-primary/10 shadow-[0_0_0_1px_rgba(251,146,60,0.15),0_4px_16px_-8px_rgba(251,146,60,0.2)] dark:shadow-[0_0_0_1px_rgba(251,146,60,0.25),0_4px_16px_-8px_rgba(251,146,60,0.3)]"
                    : "hover:bg-muted"
                }`}
              >
                <span
                  className={`w-10 text-sm font-semibold transition-colors duration-200 ${
                    activeDay === i ? "text-primary" : "text-foreground"
                  }`}
                >
                  {row.day}
                </span>

                <span className="flex-1 text-sm text-muted-foreground">
                  {row.meal}
                  <span className="ml-1 text-muted-foreground/60">
                    · {row.cal} kcal
                  </span>
                </span>

                <span className="text-sm text-muted-foreground">
                  {row.workout}
                </span>

                {/* Expanded detail on active */}
                <div
                  className={`w-full overflow-hidden transition-all duration-300 sm:hidden ${
                    activeDay === i
                      ? "max-h-12 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <span className="text-[11px] font-medium uppercase tracking-wider text-primary">
                    {row.workoutType}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
