import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MealPlansPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Meal Plans</h1>
        <p className="text-muted-foreground">
          Plan and organize your weekly meals for optimal nutrition
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>This Week&apos;s Plan</CardTitle>
            <CardDescription>
              Your current meal plan for the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Coming soon - Create and manage your weekly meal plans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meal Prep</CardTitle>
            <CardDescription>Prepare meals in advance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Coming soon - Meal preparation guides and schedules
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nutrition Goals</CardTitle>
            <CardDescription>Track your nutritional targets</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Coming soon - Set and monitor nutrition goals
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
