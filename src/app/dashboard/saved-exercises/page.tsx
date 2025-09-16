import { Calendar, Clock, Heart, Play, Trash2, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SavedExercisesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Saved Exercises</h1>
        <p className="text-muted-foreground">
          Your collection of favorite exercises and workouts
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-4 border-b overflow-x-auto">
        <button className="px-4 py-2 border-b-2 border-green-500 text-purple-500 font-medium whitespace-nowrap">
          All Exercises
        </button>
        <button className="px-4 py-2 text-muted-foreground hover:text-foreground whitespace-nowrap">
          Strength
        </button>
        <button className="px-4 py-2 text-muted-foreground hover:text-foreground whitespace-nowrap">
          Cardio
        </button>
        <button className="px-4 py-2 text-muted-foreground hover:text-foreground whitespace-nowrap">
          Flexibility
        </button>
        <button className="px-4 py-2 text-muted-foreground hover:text-foreground whitespace-nowrap">
          Core
        </button>
        <button className="px-4 py-2 text-muted-foreground hover:text-foreground whitespace-nowrap">
          Recently Added
        </button>
      </div>

      {/* Saved exercises grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Push-ups",
            category: "Upper Body",
            duration: "3 sets × 15 reps",
            difficulty: "Beginner",
            equipment: "Bodyweight",
            calories: "8-12 cal/min",
            muscles: ["Chest", "Shoulders", "Triceps"],
            savedDate: "2 days ago",
            lastPerformed: "1 day ago",
          },
          {
            name: "Deadlifts",
            category: "Strength",
            duration: "4 sets × 8 reps",
            difficulty: "Advanced",
            equipment: "Barbell",
            calories: "12-18 cal/min",
            muscles: ["Back", "Glutes", "Hamstrings"],
            savedDate: "1 week ago",
            lastPerformed: "3 days ago",
          },
          {
            name: "Plank",
            category: "Core",
            duration: "3 sets × 60 sec",
            difficulty: "Intermediate",
            equipment: "Bodyweight",
            calories: "5-8 cal/min",
            muscles: ["Core", "Shoulders"],
            savedDate: "3 days ago",
            lastPerformed: "Today",
          },
          {
            name: "Burpees",
            category: "Full Body",
            duration: "3 sets × 10 reps",
            difficulty: "Advanced",
            equipment: "Bodyweight",
            calories: "15-20 cal/min",
            muscles: ["Full Body", "Cardio"],
            savedDate: "5 days ago",
            lastPerformed: "2 days ago",
          },
          {
            name: "Yoga Sun Salutation",
            category: "Flexibility",
            duration: "5 rounds",
            difficulty: "Beginner",
            equipment: "Mat",
            calories: "3-5 cal/min",
            muscles: ["Full Body", "Flexibility"],
            savedDate: "1 week ago",
            lastPerformed: "Yesterday",
          },
          {
            name: "Mountain Climbers",
            category: "Cardio",
            duration: "3 sets × 30 sec",
            difficulty: "Intermediate",
            equipment: "Bodyweight",
            calories: "12-16 cal/min",
            muscles: ["Core", "Shoulders", "Legs"],
            savedDate: "4 days ago",
            lastPerformed: "2 days ago",
          },
        ].map((exercise, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{exercise.name}</CardTitle>
                  <CardDescription>{exercise.category}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-muted rounded">
                    <Heart className="w-5 h-5 text-red-500 dark:text-red-400" />
                  </button>
                  <button className="p-1 hover:bg-muted rounded">
                    <Trash2 className="w-5 h-5 text-muted-foreground hover:text-red-500 dark:hover:text-red-400" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{exercise.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>{exercise.calories}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      exercise.difficulty === "Beginner"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : exercise.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {exercise.difficulty}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Equipment: </span>
                  <span className="text-foreground">{exercise.equipment}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Target Muscles:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {exercise.muscles.map((muscle, muscleIndex) => (
                      <span
                        key={muscleIndex}
                        className="px-2 py-1 bg-muted text-foreground rounded-full text-xs"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Saved: {exercise.savedDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play className="w-3 h-3" />
                    <span>Last performed: {exercise.lastPerformed}</span>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 bg-purple-500 text-white py-2 rounded-md hover:bg-green-700 transition-colors text-sm">
                    Start Exercise
                  </button>
                  <button className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-green-50 transition-colors text-sm dark:border-purple-400 dark:text-purple-400 dark:hover:bg-muted">
                    Add to Plan
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state when no exercises saved */}
      {false && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No saved exercises yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Start exploring exercises and save your favorites to see them here.
          </p>
          <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Explore Exercises
          </button>
        </div>
      )}

      {/* Quick actions */}
      <div className="bg-muted rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-card rounded-lg hover:shadow-md transition-shadow text-left">
            <div className="bg-green-100 p-2 rounded-lg dark:bg-green-900 dark:text-green-200">
              <Play className="w-5 h-5 text-purple-500 dark:text-purple-200" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Create Workout</h4>
              <p className="text-sm text-muted-foreground">
                Build a workout from saved exercises
              </p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-card rounded-lg hover:shadow-md transition-shadow text-left">
            <div className="bg-blue-100 p-2 rounded-lg dark:bg-blue-900 dark:text-blue-200">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-200" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Schedule Session</h4>
              <p className="text-sm text-muted-foreground">
                Plan your next workout time
              </p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-card rounded-lg hover:shadow-md transition-shadow text-left">
            <div className="bg-purple-100 p-2 rounded-lg dark:bg-purple-900 dark:text-purple-200">
              <Zap className="w-5 h-5 text-purple-600 dark:text-purple-200" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Quick Workout</h4>
              <p className="text-sm text-muted-foreground">
                Start a 15-minute session now
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
