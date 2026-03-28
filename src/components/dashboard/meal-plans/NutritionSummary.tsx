"use client";

import { useState, useEffect } from "react";
import type { DailyStats, WeeklyMeals } from "./types";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { WeeklyMacroChart } from "./WeeklyMacroChart";
import { cn } from "@/lib/utils";

interface NutritionSummaryProps {
  stats: DailyStats;
  weeklyMeals: WeeklyMeals;
  currentDayIndex: number;
}

const MACRO_TARGETS = {
  protein: 150,
  carbs: 250,
  fat: 65,
};

type MacroStatus = "good" | "low" | "high" | "full" | "critical";

function getMacroStatus(pct: number): MacroStatus {
  if (pct >= 95) return "full";
  if (pct >= 70) return "good";
  if (pct >= 40) return "low";
  return "critical";
}

const statusConfig: Record<
  MacroStatus,
  { indicator: string; label: string; color: string }
> = {
  full: { indicator: "⚠", label: "full", color: "text-amber-500" },
  good: { indicator: "✓", label: "good", color: "text-emerald-500" },
  low: { indicator: "↓", label: "low", color: "text-sky-500" },
  high: { indicator: "↑", label: "high", color: "text-amber-500" },
  critical: { indicator: "↓↓", label: "very low", color: "text-red-500" },
};

const barTrackColors: Record<string, string> = {
  "bg-sky-500": "bg-sky-500/10",
  "bg-orange-500": "bg-orange-500/10",
  "bg-rose-500": "bg-rose-500/10",
  "bg-amber-500": "bg-amber-500/10",
};

const radarChartConfig = {
  value: {
    label: "Intake",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

function MacroBar({
  label,
  value,
  target,
  color,
}: {
  label: string;
  value: number;
  target: number;
  color: string;
}) {
  const pct = Math.round((value / target) * 100);
  const status = getMacroStatus(pct);
  const config = statusConfig[status];
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(Math.min(100, pct)), 80);
    return () => clearTimeout(timer);
  }, [pct]);

  return (
    <div className="flex items-center gap-2 py-1 px-1.5 -mx-1.5 rounded-md transition-colors duration-150">
      <span className="w-[52px] text-[11px] text-muted-foreground font-medium">
        {label}
      </span>
      <div
        className={cn(
          "flex-1 h-[8px] rounded-full overflow-hidden",
          barTrackColors[color] ?? "bg-muted/60",
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            color,
          )}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="w-[72px] text-right text-[11px] tabular-nums flex items-center justify-end gap-1">
        <span className="text-foreground">{value}g</span>
        <span className={cn("text-[10px]", config.color)}>
          {config.indicator}
        </span>
      </span>
    </div>
  );
}

function getStatusHeadline(stats: DailyStats): {
  text: string;
  variant: "good" | "warning" | "over";
} {
  const caloriePct = stats.totalCalories / stats.goal;
  const proteinPct = stats.protein / MACRO_TARGETS.protein;
  const remaining = stats.caloriesLeft;

  if (remaining <= 0) {
    return { text: "Over Target", variant: "over" };
  }
  if (caloriePct >= 0.85 && proteinPct >= 0.7) {
    return { text: "On Track Today", variant: "good" };
  }
  if (caloriePct < 0.3) {
    return { text: "Just Getting Started", variant: "warning" };
  }
  if (proteinPct < 0.4) {
    return { text: "Needs More Protein", variant: "warning" };
  }
  return { text: "On Track Today", variant: "good" };
}

function getInsight(stats: DailyStats): {
  title: string;
  body: string;
  action: string;
  type: "warn" | "good" | "info";
} | null {
  const proteinPct = stats.protein / MACRO_TARGETS.protein;
  const carbsPct = stats.carbs / MACRO_TARGETS.carbs;
  const fatPct = stats.fat / MACRO_TARGETS.fat;
  const caloriePct = stats.totalCalories / stats.goal;

  if (proteinPct < 0.4 && caloriePct > 0.3) {
    const short = Math.round(MACRO_TARGETS.protein * (1 - proteinPct));
    return {
      title: "Low protein",
      body: `You're ~${short}g short of target`,
      action: "Add: eggs, paneer, or dal",
      type: "warn",
    };
  }

  if (stats.caloriesLeft <= 0) {
    return {
      title: "Over budget",
      body: `${Math.abs(stats.caloriesLeft)} kcal over target`,
      action: "Consider lighter meals next",
      type: "warn",
    };
  }

  if (proteinPct >= 0.85 && carbsPct >= 0.6) {
    return {
      title: "Strong intake today",
      body: "Protein and carbs are well balanced",
      action: "Keep this pattern tomorrow",
      type: "good",
    };
  }

  if (carbsPct > 0.85 && proteinPct < 0.5) {
    return {
      title: "High carbs, low protein",
      body: "Ratio is skewed toward carbs",
      action: "Add: dal, chicken, or tofu",
      type: "warn",
    };
  }

  if (fatPct > 0.9) {
    return {
      title: "Fat nearing limit",
      body: `${Math.round(MACRO_TARGETS.fat * fatPct)}g of ${MACRO_TARGETS.fat}g used`,
      action: "Go lighter on oil/ghee next",
      type: "warn",
    };
  }

  if (caloriePct < 0.3) {
    return {
      title: "Room to eat more",
      body: `${stats.caloriesLeft} kcal remaining`,
      action: "Plan your next meal",
      type: "info",
    };
  }

  return null;
}

export function NutritionSummary({
  stats,
  weeklyMeals,
  currentDayIndex,
}: NutritionSummaryProps) {
  const caloriePct = Math.round((stats.totalCalories / stats.goal) * 100);
  const remaining = stats.caloriesLeft;
  const isOver = remaining <= 0;

  const headline = getStatusHeadline(stats);
  const insight = getInsight(stats);

  const radarData = [
    {
      subject: "Protein",
      value: Math.min(
        100,
        Math.round((stats.protein / MACRO_TARGETS.protein) * 100),
      ),
    },
    {
      subject: "Carbs",
      value: Math.min(
        100,
        Math.round((stats.carbs / MACRO_TARGETS.carbs) * 100),
      ),
    },
    {
      subject: "Fat",
      value: Math.min(100, Math.round((stats.fat / MACRO_TARGETS.fat) * 100)),
    },
    {
      subject: "Calories",
      value: Math.min(100, caloriePct),
    },
  ];

  const radarFill =
    headline.variant === "over"
      ? "hsl(0 72% 51%)"
      : headline.variant === "warning"
        ? "hsl(38 92% 50%)"
        : "currentColor";

  const radarStroke =
    headline.variant === "over"
      ? "hsl(0 72% 51%)"
      : headline.variant === "warning"
        ? "hsl(38 92% 50%)"
        : "currentColor";

  return (
    <div className="sticky top-4 rounded-2xl bg-muted/30 p-5">
      {/* Headline — the anchor */}
      <div className="mb-4">
        <h3
          className={cn(
            "text-sm font-semibold tracking-tight",
            headline.variant === "good" &&
              "text-emerald-600 dark:text-emerald-400",
            headline.variant === "warning" &&
              "text-amber-600 dark:text-amber-400",
            headline.variant === "over" && "text-red-600 dark:text-red-400",
          )}
        >
          {headline.text}
        </h3>
        <p className="text-[11px] text-muted-foreground mt-0.5 tabular-nums">
          {isOver ? "+" : ""}
          {Math.abs(remaining)} kcal {isOver ? "over" : "remaining"} ·{" "}
          {caloriePct}% of daily goal
        </p>
      </div>

      {/* Radar — using ChartContainer for proper color injection */}
      <div className="w-full max-w-[240px] mx-auto mb-4">
        <ChartContainer
          config={radarChartConfig}
          className="aspect-square text-primary"
          initialDimension={{ width: 240, height: 240 }}
        >
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
            <PolarGrid
              stroke="currentColor"
              className="text-border"
              strokeOpacity={0.3}
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fontSize: 10,
                fill: "currentColor",
                fontWeight: 500,
              }}
              className="text-muted-foreground"
            />
            <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
            <Radar
              dataKey="value"
              stroke={radarStroke}
              fill={radarFill}
              fillOpacity={0.15}
              strokeWidth={2}
              dot={{
                r: 3,
                fill: radarStroke,
                strokeWidth: 0,
              }}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ChartContainer>
      </div>

      {/* Macro bars — with status indicators */}
      <div className="space-y-1.5 mb-4">
        <MacroBar
          label="Protein"
          value={stats.protein}
          target={MACRO_TARGETS.protein}
          color="bg-sky-500"
        />
        <MacroBar
          label="Carbs"
          value={stats.carbs}
          target={MACRO_TARGETS.carbs}
          color="bg-orange-500"
        />
        <MacroBar
          label="Fat"
          value={stats.fat}
          target={MACRO_TARGETS.fat}
          color="bg-rose-500"
        />
        <MacroBar
          label="Calories"
          value={stats.totalCalories}
          target={stats.goal}
          color="bg-amber-500"
        />
      </div>

      {/* Insight block — the brain */}
      {insight && (
        <div
          className={cn(
            "rounded-lg px-3 py-2.5",
            insight.type === "warn" && "bg-amber-500/8 dark:bg-amber-500/10",
            insight.type === "good" &&
              "bg-emerald-500/8 dark:bg-emerald-500/10",
            insight.type === "info" && "bg-sky-500/8 dark:bg-sky-500/10",
          )}
        >
          <p
            className={cn(
              "text-[12px] font-semibold",
              insight.type === "warn" && "text-amber-700 dark:text-amber-300",
              insight.type === "good" &&
                "text-emerald-700 dark:text-emerald-300",
              insight.type === "info" && "text-sky-700 dark:text-sky-300",
            )}
          >
            {insight.type === "warn"
              ? "⚠"
              : insight.type === "good"
                ? "✓"
                : "ℹ"}{" "}
            {insight.title}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {insight.body}
          </p>
          <p className="text-[11px] font-medium text-foreground/70 mt-1">
            → {insight.action}
          </p>
        </div>
      )}

      {/* Weekly macro comparison */}
      <WeeklyMacroChart
        weeklyMeals={weeklyMeals}
        currentDayIndex={currentDayIndex}
      />
    </div>
  );
}
