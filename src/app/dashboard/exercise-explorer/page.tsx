import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Filter, Heart, Play, Clock, Zap } from "lucide-react";

export default function ExerciseExplorerPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Exercise Explorer</h1>
        <p className="text-muted-foreground">
          Discover new exercises and build your perfect workout routine
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search exercises..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex space-x-4 border-b overflow-x-auto">
        <button className="px-4 py-2 border-b-2 border-green-500 text-green-600 font-medium whitespace-nowrap">
          All Exercises
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700 whitespace-nowrap">
          Strength
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700 whitespace-nowrap">
          Cardio
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700 whitespace-nowrap">
          Flexibility
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700 whitespace-nowrap">
          Core
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700 whitespace-nowrap">
          Upper Body
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700 whitespace-nowrap">
          Lower Body
        </button>
      </div>

      {/* Exercise grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Push-ups",
            category: "Upper Body",
            duration: "3 sets",
            difficulty: "Beginner",
            equipment: "Bodyweight",
            calories: "8-12 cal/min",
            muscles: ["Chest", "Shoulders", "Triceps"],
          },
          {
            name: "Squats",
            category: "Lower Body",
            duration: "3 sets",
            difficulty: "Beginner",
            equipment: "Bodyweight",
            calories: "10-15 cal/min",
            muscles: ["Quadriceps", "Glutes", "Hamstrings"],
          },
          {
            name: "Burpees",
            category: "Full Body",
            duration: "HIIT",
            difficulty: "Advanced",
            equipment: "Bodyweight",
            calories: "15-20 cal/min",
            muscles: ["Full Body", "Cardio"],
          },
          {
            name: "Plank",
            category: "Core",
            duration: "Hold",
            difficulty: "Intermediate",
            equipment: "Bodyweight",
            calories: "5-8 cal/min",
            muscles: ["Core", "Shoulders"],
          },
          {
            name: "Deadlifts",
            category: "Strength",
            duration: "3 sets",
            difficulty: "Advanced",
            equipment: "Barbell",
            calories: "12-18 cal/min",
            muscles: ["Back", "Glutes", "Hamstrings"],
          },
          {
            name: "Mountain Climbers",
            category: "Cardio",
            duration: "HIIT",
            difficulty: "Intermediate",
            equipment: "Bodyweight",
            calories: "12-16 cal/min",
            muscles: ["Core", "Shoulders", "Legs"],
          },
          {
            name: "Yoga Sun Salutation",
            category: "Flexibility",
            duration: "Flow",
            difficulty: "Beginner",
            equipment: "Mat",
            calories: "3-5 cal/min",
            muscles: ["Full Body", "Flexibility"],
          },
          {
            name: "Bicep Curls",
            category: "Upper Body",
            duration: "3 sets",
            difficulty: "Beginner",
            equipment: "Dumbbells",
            calories: "6-10 cal/min",
            muscles: ["Biceps", "Forearms"],
          },
          {
            name: "Jumping Jacks",
            category: "Cardio",
            duration: "HIIT",
            difficulty: "Beginner",
            equipment: "Bodyweight",
            calories: "10-14 cal/min",
            muscles: ["Full Body", "Cardio"],
          },
        ].map((exercise, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{exercise.name}</CardTitle>
                  <CardDescription>{exercise.category}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Play className="w-5 h-5 text-green-600" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
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
                  <span className="text-gray-600">Difficulty:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    exercise.difficulty === "Beginner" 
                      ? "bg-green-100 text-green-800"
                      : exercise.difficulty === "Intermediate"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {exercise.difficulty}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Equipment: </span>
                  <span className="text-gray-800">{exercise.equipment}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Target Muscles:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {exercise.muscles.map((muscle, muscleIndex) => (
                      <span 
                        key={muscleIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors text-sm">
                    Start Exercise
                  </button>
                  <button className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors text-sm">
                    Add to Plan
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load more button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Load More Exercises
        </button>
      </div>
    </div>
  );
}
