import type { WeeklyStats } from "./types";

interface WeeklyStatsCardProps {
  stats: WeeklyStats;
}

export function WeeklyStatsCard({ stats }: WeeklyStatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Stats</h3>
      <div className="grid grid-cols-4 gap-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Avg. Daily Calories</p>
          <p className="text-2xl font-bold text-green-600">
            {stats.avgCalories}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Avg. Protein</p>
          <p className="text-2xl font-bold text-blue-600">
            {stats.avgProtein}g
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Avg. Carbs</p>
          <p className="text-2xl font-bold text-orange-600">
            {stats.avgCarbs}g
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Avg. Fat</p>
          <p className="text-2xl font-bold text-purple-600">{stats.avgFat}g</p>
        </div>
      </div>
    </div>
  );
}
