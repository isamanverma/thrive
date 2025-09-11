"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      {/* Title */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Recipe Explorer
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-96">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <Search className="h-4 w-4" />
        </div>
        <Input
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
        />
        <Button
          onClick={onSearchSubmit}
          disabled={loading}
          size="sm"
          className="absolute inset-y-0 right-1 my-1 flex items-center justify-center rounded-md px-3 bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          {loading ? (
            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </div>
  );
}
