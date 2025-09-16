import { BarChart, BookOpen, ChefHat } from "lucide-react";

import React from "react";

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Features
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Explore the key features that make Thrive your ultimate meal
            planning companion.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <div className="p-6 bg-card rounded-lg shadow-lg">
              <ChefHat className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-card-foreground">
                Meal Plan Generator
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Create custom meal plans or let our AI generate one for you,
                complete with shopping lists and nutritional information.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-6 bg-card rounded-lg shadow-lg">
              <BookOpen className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-card-foreground">
                Recipe Discovery
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Browse a vast library of recipes, filter by dietary needs, and
                save your favorites for later.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-6 bg-card rounded-lg shadow-lg">
              <BarChart className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-card-foreground">
                Progress Tracking
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor your meal adherence and track progress with insights and
                simple charts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
