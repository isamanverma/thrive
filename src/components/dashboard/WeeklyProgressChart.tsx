"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface WeeklyProgressChartProps {
  mealData: number[];
  exerciseData: number[];
  labels: string[];
}

const chartConfig = {
  meals: {
    label: "Meals",
    color: "hsl(142 76% 36%)", // Green for meals
  },
  exercise: {
    label: "Exercise",
    color: "hsl(217 91% 60%)", // Blue for exercise
  },
} satisfies ChartConfig;

export function WeeklyProgressChart({
  mealData,
  exerciseData,
  labels,
}: WeeklyProgressChartProps) {
  // Transform the data into the format expected by recharts
  const chartData = labels.map((label, index) => ({
    day: label,
    meals: mealData[index] || 0,
    exercise: exerciseData[index] || 0,
  }));

  return (
    <div className="h-40">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
            top: 8,
            bottom: 8,
          }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            className="stroke-muted/30"
          />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
          />
          <YAxis domain={[0, 100]} hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="meals"
            type="monotone"
            stroke="var(--color-meals)"
            strokeWidth={2.5}
            dot={{
              fill: "var(--color-meals)",
              strokeWidth: 0,
              r: 3,
            }}
            activeDot={{
              r: 5,
              stroke: "var(--color-meals)",
              strokeWidth: 2,
              fill: "white",
            }}
          />
          <Line
            dataKey="exercise"
            type="monotone"
            stroke="var(--color-exercise)"
            strokeWidth={2.5}
            dot={{
              fill: "var(--color-exercise)",
              strokeWidth: 0,
              r: 3,
            }}
            activeDot={{
              r: 5,
              stroke: "var(--color-exercise)",
              strokeWidth: 2,
              fill: "white",
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
