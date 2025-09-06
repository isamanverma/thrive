import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MealPlansPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Meal Plans</h1>
        <p className="text-muted-foreground">
          Plan and organize your weekly meals for optimal nutrition
        </p>
      </div>

      {/* Current meal plan */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Current Week
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <div key={day} className="border rounded-lg p-3">
              <h3 className="font-medium text-gray-900 mb-2">{day}</h3>
              <div className="space-y-1 text-sm">
                <div className="p-2 bg-yellow-50 rounded text-yellow-800">
                  Breakfast: Oatmeal
                </div>
                <div className="p-2 bg-green-50 rounded text-green-800">
                  Lunch: Salad
                </div>
                <div className="p-2 bg-blue-50 rounded text-blue-800">
                  Dinner: Chicken
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>This Week&apos;s Plan</CardTitle>
            <CardDescription>
              Your current meal plan for the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full">
              Create New Plan
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meal Prep</CardTitle>
            <CardDescription>Prepare meals in advance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get organized with meal preparation guides and schedules
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full">
              Start Prep
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nutrition Goals</CardTitle>
            <CardDescription>Track your nutritional targets</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Set and monitor your daily nutrition goals
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full">
              Set Goals
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
