import type { DailyStats } from "./types";

interface DailyStatsCardProps {
  stats: DailyStats;
}

export function DailyStatsCard({ stats }: DailyStatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
      <div className="grid grid-cols-5 gap-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Total Calories</p>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalCalories}
          </p>
          <p className="text-xs text-gray-500">Goal: {stats.goal} kcal</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Calories Left</p>
          <p className="text-3xl font-bold text-green-600">
            {stats.caloriesLeft}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Protein</p>
          <p className="text-3xl font-bold text-blue-600">{stats.protein}g</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Carbs</p>
          <p className="text-3xl font-bold text-orange-600">{stats.carbs}g</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Fat</p>
          <p className="text-3xl font-bold text-purple-600">{stats.fat}g</p>
        </div>
      </div>
    </div>
  );
}
