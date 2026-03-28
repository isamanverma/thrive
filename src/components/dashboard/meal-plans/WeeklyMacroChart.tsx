"use client";

import type { WeeklyMeals } from "./types";
import { Bar, BarChart, XAxis, Tooltip, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface WeeklyMacroChartProps {
  weeklyMeals: WeeklyMeals;
  currentDayIndex: number;
}

const chartConfig = {
  protein: {
    label: "Protein",
    color: "hsl(199, 89%, 48%)",
  },
  carbs: {
    label: "Carbs",
    color: "hsl(25, 95%, 53%)",
  },
  fat: {
    label: "Fat",
    color: "hsl(350, 89%, 60%)",
  },
} satisfies ChartConfig;

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function computeDayMacros(dayMeals: WeeklyMeals[number]): {
  protein: number;
  carbs: number;
  fat: number;
} {
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  Object.values(dayMeals).forEach((meal) => {
    if (meal?.dishes) {
      meal.dishes.forEach((dish) => {
        const nut = dish.nutrition as
          | {
              nutrients?: Array<{ name: string; amount: number }>;
            }
          | undefined;
        if (nut?.nutrients) {
          const p = nut.nutrients.find(
            (n) => n.name?.toLowerCase() === "protein",
          )?.amount;
          const c = nut.nutrients.find(
            (n) =>
              n.name?.toLowerCase() === "carbohydrates" ||
              n.name?.toLowerCase() === "carbs",
          )?.amount;
          const f = nut.nutrients.find(
            (n) => n.name?.toLowerCase() === "fat",
          )?.amount;
          protein += p ? Math.round(p * dish.quantity) : 0;
          carbs += c ? Math.round(c * dish.quantity) : 0;
          fat += f ? Math.round(f * dish.quantity) : 0;
        }
      });
    }
  });

  return { protein, carbs, fat };
}

export function WeeklyMacroChart({
  weeklyMeals,
  currentDayIndex,
}: WeeklyMacroChartProps) {
  const adjustedDayIndex = (currentDayIndex - 1 + 7) % 7;

  const data = dayLabels.map((label, i) => {
    const macros = computeDayMacros(weeklyMeals[i] || {});
    return {
      day: label,
      ...macros,
      isToday: i === adjustedDayIndex,
    };
  });

  return (
    <div className="mt-4 pt-4 border-t border-border/30">
      <p className="text-[11px] font-semibold text-muted-foreground mb-3">
        Weekly Macros
      </p>
      <ChartContainer config={chartConfig} className="h-[160px] w-full">
        <BarChart
          data={data}
          accessibilityLayer
          margin={{ top: 4, right: 4, bottom: 0, left: 4 }}
          barCategoryGap="20%"
          barGap={1.5}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 10,
              fill: "currentColor",
              fontWeight: 500,
            }}
            className="text-muted-foreground"
            tickMargin={4}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
            content={
              <ChartTooltipContent
                indicator="dot"
                labelClassName="text-[11px]"
              />
            }
          />
          <Bar
            dataKey="protein"
            fill="currentColor"
            className="text-sky-500"
            radius={[3, 3, 0, 0]}
            barSize={8}
          >
            {data.map((entry, index) => (
              <Cell
                key={`protein-${index}`}
                fillOpacity={entry.isToday ? 1 : 0.4}
              />
            ))}
          </Bar>
          <Bar
            dataKey="carbs"
            fill="currentColor"
            className="text-orange-500"
            radius={[3, 3, 0, 0]}
            barSize={8}
          >
            {data.map((entry, index) => (
              <Cell
                key={`carbs-${index}`}
                fillOpacity={entry.isToday ? 1 : 0.4}
              />
            ))}
          </Bar>
          <Bar
            dataKey="fat"
            fill="currentColor"
            className="text-rose-500"
            radius={[3, 3, 0, 0]}
            barSize={8}
          >
            {data.map((entry, index) => (
              <Cell
                key={`fat-${index}`}
                fillOpacity={entry.isToday ? 1 : 0.4}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
          Protein
        </span>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          Carbs
        </span>
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Fat
        </span>
      </div>
    </div>
  );
}
