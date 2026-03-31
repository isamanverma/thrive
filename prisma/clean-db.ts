import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning database...");

  await prisma.$transaction([
    prisma.mealDish.deleteMany(),
    prisma.mealPlanItem.deleteMany(),
    prisma.mealPlan.deleteMany(),
    prisma.recipeIngredient.deleteMany(),
    prisma.recipe.deleteMany(),
    prisma.userRecipe.deleteMany(),
    prisma.progress.deleteMany(),
  ]);

  console.log("Database cleaned! All recipes, meals, and meal plans deleted.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
