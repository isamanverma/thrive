"use client";

import Link from "next/link";

interface RecipeInstructionsProps {
  instructions: Array<{
    name?: string;
    steps: Array<{
      number: number;
      step: string;
      equipment?: Array<{
        id: number;
        name: string;
      }>;
      ingredients?: Array<{
        id: number;
        name: string;
      }>;
    }>;
  }>;
  sourceUrl?: string;
}

export function RecipeInstructions({
  instructions,
  sourceUrl,
}: RecipeInstructionsProps) {
  const hasInstructions =
    instructions &&
    instructions.length > 0 &&
    instructions[0].steps &&
    instructions[0].steps.length > 0;

  return (
    <div>
      <h3 className="mb-6 text-3xl font-bold text-foreground">Preparation</h3>
      <div className="prose prose-lg max-w-none text-muted-foreground">
        {hasInstructions ? (
          <ol className="list-decimal space-y-6 pl-6">
            {instructions[0].steps.map((step) => (
              <li key={step.number} className="text-muted-foreground">
                <strong className="text-foreground font-semibold">
                  Step {step.number}:
                </strong>{" "}
                {step.step}
              </li>
            ))}
          </ol>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              No detailed instructions available for this recipe.
            </p>
            {sourceUrl && (
              <Link
                href={sourceUrl}
                target="_blank"
                className="text-green-600 hover:text-orange-700 underline font-medium"
              >
                View original recipe
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
