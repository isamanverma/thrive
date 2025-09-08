"use client";

import { Heart, BookmarkPlus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  diets?: string[];
  cuisines?: string[];
  summary?: string;
}

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToMealPlan: (recipeId: number) => void;
  onSaveToFavorites: (recipeId: number) => void;
  isSaved?: boolean;
}

export function RecipeModal({
  recipe,
  isOpen,
  onClose,
  onAddToMealPlan,
  onSaveToFavorites,
  isSaved = false,
}: RecipeModalProps) {
  if (!recipe) return null;

  const cleanSummary =
    recipe.summary?.replace(/<[^>]*>/g, "") || "Delicious recipe to try!";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex max-h-[90vh] flex-col overflow-hidden md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-video md:aspect-auto md:h-full">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://via.placeholder.com/600x400?text=Recipe+Image";
                }}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full overflow-y-auto p-8 md:w-1/2">
            <DialogHeader className="mb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <BlurFade delay={0.1} inView>
                    <DialogTitle className="text-2xl font-extrabold text-foreground pr-8">
                      {recipe.title}
                    </DialogTitle>
                  </BlurFade>
                  <BlurFade delay={0.2} inView>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {cleanSummary}
                    </p>
                  </BlurFade>
                </div>
              </div>
            </DialogHeader>

            {/* Recipe Stats */}
            <BlurFade delay={0.3} inView>
              <div className="mb-6">
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {recipe.readyInMinutes && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        ⏱️ {recipe.readyInMinutes} minutes
                      </span>
                    </div>
                  )}
                  {recipe.servings && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        👥 {recipe.servings} servings
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </BlurFade>

            {/* Tags */}
            <BlurFade delay={0.4} inView>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {recipe.diets?.slice(0, 3).map((diet) => (
                    <Badge
                      key={diet}
                      variant="secondary"
                      className="rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {diet}
                    </Badge>
                  ))}
                  {recipe.cuisines?.slice(0, 2).map((cuisine) => (
                    <Badge
                      key={cuisine}
                      variant="outline"
                      className="rounded-full"
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>
            </BlurFade>

            {/* Sample Ingredients */}
            <BlurFade delay={0.5} inView>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Sample Ingredients
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                  <li>Fresh seasonal ingredients</li>
                  <li>Quality spices and herbs</li>
                  <li>Pantry staples</li>
                  <li>Optional garnishes</li>
                </ul>
              </div>
            </BlurFade>

            {/* Action Buttons */}
            <BlurFade delay={0.6} inView>
              <div className="flex flex-col gap-3">
                <ShimmerButton
                  onClick={() => onAddToMealPlan(recipe.id)}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3",
                    "text-base font-bold text-white hover:bg-green-700 transition-colors"
                  )}
                >
                  <Plus className="h-5 w-5" />
                  Add to Meal Plan
                </ShimmerButton>

                <Button
                  variant="outline"
                  onClick={() => onSaveToFavorites(recipe.id)}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3",
                    "text-base font-bold transition-colors",
                    isSaved
                      ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                      : "hover:bg-accent"
                  )}
                >
                  {isSaved ? (
                    <Heart className="h-5 w-5 fill-current" />
                  ) : (
                    <BookmarkPlus className="h-5 w-5" />
                  )}
                  {isSaved ? "Saved to Favorites" : "Save to Favorites"}
                </Button>
              </div>
            </BlurFade>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
