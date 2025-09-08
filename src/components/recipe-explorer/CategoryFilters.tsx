"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snacks", label: "Snacks" },
] as const;

const SORT_OPTIONS = [
  { value: "relevance", label: "Sort by: Relevance" },
  { value: "popularity", label: "Popularity" },
  { value: "time", label: "Time" },
  { value: "similarity", label: "Similarity" },
] as const;

interface CategoryFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function CategoryFilters({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: CategoryFiltersProps) {
  return (
    <BlurFade delay={0.2} inView>
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((category, index) => (
            <BlurFade key={category.id} delay={0.3 + index * 0.1} inView>
              <Button
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  activeCategory === category.id
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-md ring-2 ring-green-500/20"
                    : "bg-background border-border hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {category.label}
              </Button>
            </BlurFade>
          ))}
        </div>

        {/* Sort Dropdown */}
        <BlurFade delay={0.7} inView>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className={cn(
                "w-full appearance-none rounded-lg border border-border bg-background px-3 py-1.5 pr-8 text-xs font-medium transition-all duration-200",
                "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20",
                "hover:bg-accent cursor-pointer"
              )}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </BlurFade>
      </div>
    </BlurFade>
  );
}
