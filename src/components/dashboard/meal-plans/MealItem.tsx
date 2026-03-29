import type { Dish } from "./types";
import Image from "next/image";
import { useRouter } from "next/navigation";

function resolveNutrientAmount(
  nutrition: unknown,
  name: "protein" | "carbs" | "fat",
): number {
  if (!nutrition || typeof nutrition !== "object") return 0;
  const rn = nutrition as {
    nutrients?: Array<{ name?: string; amount?: number }>;
  };
  if (!Array.isArray(rn.nutrients)) return 0;

  const normalizedName = name === "carbs" ? "carbohydrates" : name;
  const found = rn.nutrients.find((n) => {
    const nName = n?.name?.toLowerCase() || "";
    return nName.includes(normalizedName) && typeof n?.amount === "number";
  });
  return typeof found?.amount === "number" ? found.amount : 0;
}

interface MealItemProps {
  dish: Dish;
}

export function MealItem({ dish }: MealItemProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        const id = dish.sourceId || dish.recipeId;
        router.push(`/recipe/${id}`);
      }}
      className="group flex items-center gap-3 w-full py-2.5 px-2 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer text-left"
    >
      <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-border/30 bg-muted shrink-0">
        {dish.image ? (
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[9px] text-muted-foreground">
            —
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] text-foreground leading-tight font-medium">
          {dish.name}
        </p>
        <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
          {dish.quantity} {dish.unit}
        </p>
      </div>
      <span className="shrink-0 text-[12px] tabular-nums text-muted-foreground font-medium">
        {dish.calories || 0} kcal
      </span>
    </button>
  );
}
