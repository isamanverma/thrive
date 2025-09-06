import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecipeExplorerPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Recipe Explorer</h1>
        <p className="text-muted-foreground">
          Discover new recipes tailored to your preferences
        </p>
      </div>

      {/* Search bar */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm cursor-pointer hover:bg-green-200">
            Vegetarian
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-pointer hover:bg-blue-200">
            Low Carb
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm cursor-pointer hover:bg-purple-200">
            High Protein
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm cursor-pointer hover:bg-yellow-200">
            Quick Meals
          </span>
        </div>
      </div>

      {/* Recipe categories */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Breakfast</CardTitle>
            <CardDescription>Start your day right</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <span>Overnight Oats</span>
                <span className="text-sm text-gray-500">15 min</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <span>Avocado Toast</span>
                <span className="text-sm text-gray-500">10 min</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <span>Greek Yogurt Bowl</span>
                <span className="text-sm text-gray-500">5 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lunch</CardTitle>
            <CardDescription>Nutritious midday meals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <span>Quinoa Salad</span>
                <span className="text-sm text-gray-500">20 min</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <span>Chicken Wrap</span>
                <span className="text-sm text-gray-500">15 min</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <span>Buddha Bowl</span>
                <span className="text-sm text-gray-500">25 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dinner</CardTitle>
            <CardDescription>Satisfying evening meals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <span>Grilled Salmon</span>
                <span className="text-sm text-gray-500">30 min</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <span>Stir Fry</span>
                <span className="text-sm text-gray-500">20 min</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <span>Pasta Primavera</span>
                <span className="text-sm text-gray-500">25 min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured recipes */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Featured Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Mediterranean Bowl", time: "25 min", calories: "450 cal" },
            { name: "Thai Curry", time: "35 min", calories: "380 cal" },
            { name: "Protein Smoothie", time: "5 min", calories: "320 cal" },
            {
              name: "Stuffed Bell Peppers",
              time: "40 min",
              calories: "290 cal",
            },
          ].map((recipe, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
              <h3 className="font-medium text-gray-900">{recipe.name}</h3>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{recipe.time}</span>
                <span>{recipe.calories}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
