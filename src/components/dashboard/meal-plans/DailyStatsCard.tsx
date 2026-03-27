import type { DailyStats } from "./types";

interface DailyStatsCardProps {
  stats: DailyStats;
}

export function DailyStatsCard({ stats }: DailyStatsCardProps) {
  const items = [
    {
      label: "Total",
      value: stats.totalCalories,
      unit: "kcal",
      color: "text-amber-600",
    },
    {
      label: "Left",
      value: stats.caloriesLeft,
      unit: "kcal",
      color: "text-amber-600",
    },
    {
      label: "Protein",
      value: `${stats.protein}g`,
      unit: null,
      color: "text-sky-600",
    },
    {
      label: "Carbs",
      value: `${stats.carbs}g`,
      unit: null,
      color: "text-orange-500",
    },
    {
      label: "Fat",
      value: `${stats.fat}g`,
      unit: null,
      color: "text-rose-500",
    },
  ];

  return (
    <div className="flex items-baseline gap-8 mb-6 px-1">
      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
        Today
      </span>
      {items.map((item) => (
        <div key={item.label} className="flex items-baseline gap-1.5">
          <span className={`text-2xl font-bold tabular-nums ${item.color}`}>
            {item.value}
          </span>
          <span className="text-xs text-muted-foreground">
            {item.unit ?? item.label.toLowerCase()}
          </span>
        </div>
      ))}
    </div>
  );
}
