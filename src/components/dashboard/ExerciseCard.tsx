"use client";

import { Check, Dumbbell, HeartPulse, Repeat, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/magicui/magic-card";

export interface Exercise {
  id: string;
  name: string;
  duration: string;
  type: "cardio" | "strength" | "flexibility";
  progress?: number; // 0-100
  completed?: boolean;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onToggleComplete?: (id: string) => void;
  onRepeat?: (id: string) => void;
  onWatchVideo?: (id: string) => void;
}

export function ExerciseCard({
  exercise,
  onToggleComplete,
  onRepeat,
  onWatchVideo,
}: ExerciseCardProps) {
  const getIcon = () => {
    switch (exercise.type) {
      case "cardio":
        return <HeartPulse className="h-8 w-8 text-blue-500" />;
      case "strength":
        return <Dumbbell className="h-8 w-8 text-blue-500" />;
      default:
        return <HeartPulse className="h-8 w-8 text-blue-500" />;
    }
  };

  return (
    <MagicCard className="bg-gray-50 p-4 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{exercise.name}</h4>
          <p className="text-sm text-gray-500">{exercise.duration}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 rounded-full ${
              exercise.completed
                ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                : "hover:bg-gray-200"
            }`}
            onClick={() => onToggleComplete?.(exercise.id)}
          >
            <Check className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={() => onRepeat?.(exercise.id)}
          >
            <Repeat className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={() => onWatchVideo?.(exercise.id)}
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {exercise.progress !== undefined && (
        <div className="mt-3">
          <div className="w-full bg-blue-100 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${exercise.progress}%` }}
            />
          </div>
        </div>
      )}
    </MagicCard>
  );
}
