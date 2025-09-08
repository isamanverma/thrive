import { RecipeSearch } from "@/components/recipe-search";

export default function RecipeExplorerPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Recipe Explorer</h1>
        <p className="text-muted-foreground">
          Discover new recipes tailored to your preferences
        </p>
      </div>

      <RecipeSearch />
    </div>
  );
}
