"use client";

import { Bookmark, Eye, Clock, Users } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  onSave: (recipeId: number) => void;
  onView: (recipeId: number) => void;
  isSaved?: boolean;
}

export function RecipeCard({
  recipe,
  index,
  onSave,
  onView,
  isSaved = false,
}: RecipeCardProps) {
  return (
    <BlurFade delay={0.5 + index * 0.1} inView>
      <MagicCard
        className={cn(
          "group flex cursor-pointer flex-col overflow-hidden border border-border bg-background shadow-sm",
          "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
          "rounded-xl"
        )}
        gradientColor="#22c55e20"
      >
        {/* Recipe Image */}
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://via.placeholder.com/400x300?text=Recipe+Image";
            }}
          />

          {/* Recipe Tags */}
          <div className="absolute bottom-2 left-2 flex gap-2">
            {recipe.readyInMinutes && (
              <Badge
                variant="secondary"
                className="rounded-full bg-white/80 text-gray-700 backdrop-blur-sm text-xs font-medium"
              >
                {recipe.readyInMinutes} mins
              </Badge>
            )}
            {recipe.diets?.slice(0, 1).map((diet) => (
              <Badge
                key={diet}
                variant="secondary"
                className="rounded-full bg-white/80 text-gray-700 backdrop-blur-sm text-xs font-medium"
              >
                {diet}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recipe Content */}
        <div className="flex flex-1 flex-col p-3">
          <h3
            className={cn(
              "text-sm font-bold text-foreground line-clamp-2 mb-2",
              "group-hover:text-green-600 transition-colors duration-200"
            )}
          >
            {recipe.title}
          </h3>

          {/* Recipe Stats */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            {recipe.readyInMinutes && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{recipe.readyInMinutes} min</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
          </div>

          {/* Additional Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.cuisines?.slice(0, 1).map((cuisine) => (
              <Badge
                key={cuisine}
                variant="outline"
                className="text-xs rounded-full"
              >
                {cuisine}
              </Badge>
            ))}
            {recipe.diets?.slice(1, 2).map((diet) => (
              <Badge
                key={diet}
                variant="outline"
                className="text-xs rounded-full"
              >
                {diet}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex items-center justify-end gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSave(recipe.id);
              }}
              className={cn(
                "h-7 w-7 p-0 rounded-full transition-all duration-200",
                isSaved
                  ? "bg-green-100 text-green-600 hover:bg-green-200"
                  : "bg-gray-100 text-muted-foreground hover:bg-gray-200 hover:text-green-600"
              )}
            >
              <Bookmark className={cn("h-3 w-3", isSaved && "fill-current")} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onView(recipe.id);
              }}
              className="h-7 w-7 p-0 rounded-full bg-gray-100 text-muted-foreground hover:bg-gray-200 hover:text-green-600 transition-all duration-200"
            >
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </MagicCard>
    </BlurFade>
  );
}
