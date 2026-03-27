import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Heart, Users } from "lucide-react";

export default function SavedRecipesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Saved Recipes</h1>
        <p className="text-muted-foreground">
          Your collection of favorite recipes
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-4 border-b">
        <button className="px-4 py-2 border-b-2 border-green-500 text-orange-500 font-medium">
          All Recipes
        </button>
        <button className="px-4 py-2 text-muted-foreground hover:text-foreground">
          Breakfast
        </button>
        <button className="px-4 py-2 text-muted-foreground hover:text-foreground">
          Lunch
        </button>
        <button className="px-4 py-2 text-muted-foreground hover:text-foreground">
          Dinner
        </button>
        <button className="px-4 py-2 text-muted-foreground hover:text-foreground">
          Snacks
        </button>
      </div>

      {/* Saved recipes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Mediterranean Quinoa Bowl",
            category: "Lunch",
            time: "25 min",
            servings: "2",
            calories: "450 cal",
            tags: ["Vegetarian", "High Protein"],
          },
          {
            name: "Grilled Salmon with Vegetables",
            category: "Dinner",
            time: "30 min",
            servings: "4",
            calories: "380 cal",
            tags: ["Low Carb", "Omega-3"],
          },
          {
            name: "Overnight Chia Pudding",
            category: "Breakfast",
            time: "5 min prep",
            servings: "1",
            calories: "320 cal",
            tags: ["Vegan", "Make-ahead"],
          },
          {
            name: "Thai Chicken Curry",
            category: "Dinner",
            time: "35 min",
            servings: "4",
            calories: "420 cal",
            tags: ["Spicy", "One-pot"],
          },
          {
            name: "Green Smoothie Bowl",
            category: "Breakfast",
            time: "10 min",
            servings: "1",
            calories: "280 cal",
            tags: ["Vegan", "Antioxidants"],
          },
          {
            name: "Stuffed Bell Peppers",
            category: "Dinner",
            time: "45 min",
            servings: "4",
            calories: "350 cal",
            tags: ["Low Carb", "Meal Prep"],
          },
        ].map((recipe, index) => (
          <Card
            key={index}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="w-full h-48 bg-input rounded-lg mb-3 relative">
                <div className="absolute top-2 right-2">
                  <Heart className="w-6 h-6 fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400" />
                </div>
              </div>
              <CardTitle className="text-lg">{recipe.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {recipe.category}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings}</span>
                </div>
                <span className="font-medium">{recipe.calories}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {recipe.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900 dark:text-green-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  View Recipe
                </button>
                <button className="px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                  Cook
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state (if no recipes) */}
      {/* <div className="text-center py-12">
        <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No saved recipes yet</h3>
        <p className="text-muted-foreground mb-4">Start exploring recipes and save your favorites!</p>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
          Explore Recipes
        </button>
      </div> */}
    </div>
  );
}
