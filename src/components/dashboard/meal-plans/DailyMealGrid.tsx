import type { MealPlanItem, MealTypeCapitalized } from "./types";

import { MealPlanCard } from "@/components/dashboard/MealPlanCard";

interface DailyMealGridProps {
  sampleMeals: {
    breakfast: MealPlanItem[];
    lunch: MealPlanItem[];
    snack: MealPlanItem[];
    dinner: MealPlanItem[];
  };
  onRecipeClick: (recipe: MealPlanItem, mealType: string) => void;
}

export function DailyMealGrid({
  sampleMeals,
  onRecipeClick,
}: DailyMealGridProps) {
  const dailyMeals = [
    {
      type: "Breakfast" as MealTypeCapitalized,
      meal: sampleMeals.breakfast[0],
      calories: 350,
      description: "Yogurt, granola, berries, and a drizzle of honey.",
    },
    {
      type: "Lunch" as MealTypeCapitalized,
      meal: sampleMeals.lunch[0],
      calories: 450,
      description: "Quinoa with chickpeas, cucumber, and lemon dressing.",
    },
    {
      type: "Snack" as MealTypeCapitalized,
      meal: sampleMeals.snack[0],
      calories: 150,
      description: "A crisp apple with a serving of natural peanut butter.",
    },
    {
      type: "Dinner" as MealTypeCapitalized,
      meal: sampleMeals.dinner[0],
      calories: 600,
      description: "Whole wheat spaghetti with a rich, meaty sauce.",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {dailyMeals.map((item, index) => (
        <MealPlanCard
          key={index}
          meal={item.meal}
          mealType={item.type}
          showMealTypeLabel={true}
          onCardClick={onRecipeClick}
        />
      ))}
    </div>
  );
}
