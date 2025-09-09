import { Calendar, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ViewMode } from "./types";

interface MealPlanHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onRegenerate: () => void;
}

export function MealPlanHeader({
  viewMode,
  onViewModeChange,
  onRegenerate,
}: MealPlanHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-gray-900">
          {viewMode === "weekly" ? "Weekly" : "Daily"} Meal Planner
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* View Toggle */}
        <div className="flex bg-gray-200 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange("weekly")}
            className={`${
              viewMode === "weekly"
                ? "bg-white shadow-sm text-gray-900 hover:bg-white"
                : "text-gray-600 hover:bg-gray-300 hover:text-gray-900"
            }`}
          >
            <Calendar className="w-4 h-4 mr-1" />
            Weekly
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange("daily")}
            className={`${
              viewMode === "daily"
                ? "bg-white shadow-sm text-gray-900 hover:bg-white"
                : "text-gray-600 hover:bg-gray-300 hover:text-gray-900"
            }`}
          >
            <Calendar className="w-4 h-4 mr-1" />
            Daily
          </Button>
        </div>

        <Button variant="outline" size="sm" onClick={onRegenerate}>
          <RotateCcw className="w-4 h-4 mr-1" />
          Regenerate {viewMode === "weekly" ? "Week" : "Day"}
        </Button>

        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
