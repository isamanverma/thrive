import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dumbbell, Clock, Calendar } from "lucide-react";

export default function ExercisePlansPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Exercise Plans</h1>
        <p className="text-muted-foreground">
          Your personalized workout routines and training schedules
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-4 border-b">
        <button className="px-4 py-2 border-b-2 border-green-500 text-green-600 font-medium">
          Active Plans
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
          Strength
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
          Cardio
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
          Flexibility
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
          Completed
        </button>
      </div>

      {/* Exercise plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Full Body Strength",
            type: "Strength Training",
            duration: "45 min",
            frequency: "3x/week",
            difficulty: "Intermediate",
            progress: "65%",
          },
          {
            name: "Morning Cardio Blast",
            type: "Cardio",
            duration: "30 min",
            frequency: "5x/week",
            difficulty: "Beginner",
            progress: "80%",
          },
          {
            name: "Yoga Flow",
            type: "Flexibility",
            duration: "20 min",
            frequency: "Daily",
            difficulty: "All Levels",
            progress: "45%",
          },
          {
            name: "HIIT Circuit",
            type: "High Intensity",
            duration: "25 min",
            frequency: "3x/week",
            difficulty: "Advanced",
            progress: "30%",
          },
          {
            name: "Core Strength",
            type: "Strength Training",
            duration: "15 min",
            frequency: "4x/week",
            difficulty: "Intermediate",
            progress: "90%",
          },
          {
            name: "Evening Stretch",
            type: "Flexibility",
            duration: "10 min",
            frequency: "Daily",
            difficulty: "Beginner",
            progress: "75%",
          },
        ].map((plan, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <CardDescription>{plan.type}</CardDescription>
                </div>
                <Dumbbell className="w-6 h-6 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{plan.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{plan.frequency}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulty:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      plan.difficulty === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : plan.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {plan.difficulty}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress:</span>
                    <span className="text-green-600 font-medium">
                      {plan.progress}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: plan.progress }}
                    ></div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                  Continue Plan
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create new plan button */}
      <div className="flex justify-center mt-8">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Dumbbell className="w-5 h-5" />
          <span>Create New Exercise Plan</span>
        </button>
      </div>
    </div>
  );
}
