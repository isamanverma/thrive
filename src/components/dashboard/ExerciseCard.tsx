"use client";

import { Check, Dumbbell, HeartPulse, Repeat, Video } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface Exercise {
  id: string;
  name: string;
  duration: string;
  type: "cardio" | "strength" | "flexibility";
  progress?: number;
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
        return <HeartPulse className="h-5 w-5 text-amber-500" />;
      case "strength":
        return <Dumbbell className="h-5 w-5 text-amber-500" />;
      default:
        return <HeartPulse className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm">{exercise.name}</h4>
          <p className="text-xs text-muted-foreground">{exercise.duration}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className={`h-7 w-7 rounded-full ${
              exercise.completed
                ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                : "hover:bg-muted"
            }`}
            onClick={() => onToggleComplete?.(exercise.id)}
            aria-label="Mark exercise complete"
          >
            <Check className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full hover:bg-muted"
            onClick={() => onRepeat?.(exercise.id)}
            aria-label="Repeat exercise"
          >
            <Repeat className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full hover:bg-muted"
            onClick={() => onWatchVideo?.(exercise.id)}
            aria-label="Watch exercise video"
          >
            <Video className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {exercise.progress !== undefined && (
        <div className="mt-2 ml-13">
          <div className="w-full bg-amber-500/20 rounded-full h-1.5">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(exercise.progress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
