import type { WeeklyStats } from "./types";

interface WeeklyStatsCardProps {
  stats: WeeklyStats;
}

export function WeeklyStatsCard({ stats }: WeeklyStatsCardProps) {
  const items = [
    {
      label: "Calories",
      value: stats.avgCalories,
      unit: "kcal",
      color: "text-amber-600",
    },
    {
      label: "Protein",
      value: `${stats.avgProtein}g`,
      unit: null,
      color: "text-sky-600",
    },
    {
      label: "Carbs",
      value: `${stats.avgCarbs}g`,
      unit: null,
      color: "text-orange-500",
    },
    {
      label: "Fat",
      value: `${stats.avgFat}g`,
      unit: null,
      color: "text-rose-500",
    },
  ];

  return (
    <div className="flex items-baseline gap-8 mb-6 px-1">
      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
        Daily avg
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
