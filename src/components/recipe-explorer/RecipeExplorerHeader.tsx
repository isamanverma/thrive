"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { cn } from "@/lib/utils";

interface RecipeExplorerHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  loading?: boolean;
}

export function RecipeExplorerHeader({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  loading = false,
}: RecipeExplorerHeaderProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <BlurFade delay={0.1} inView>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Title with shiny animation */}
        <div className="text-center md:text-left">
          <AnimatedShinyText className="text-2xl font-bold md:text-3xl">
            <span
              className={cn(
                "inline-block bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent"
              )}
            >
              Recipe Explorer
            </span>
          </AnimatedShinyText>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <Input
            type="text"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-10 text-sm transition-all duration-200 placeholder:text-muted-foreground focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
          />
          <Button
            onClick={onSearchSubmit}
            disabled={loading}
            size="sm"
            className="absolute inset-y-0 right-1 my-1 flex items-center justify-center rounded-md px-3 bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </div>
    </BlurFade>
  );
}
