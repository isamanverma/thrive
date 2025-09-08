"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function getBreadcrumbItems(pathname: string, recipeTitle?: string) {
  const segments = pathname.split("/").filter(Boolean);

  const items = [{ title: "Thrive", href: "/" }];

  if (segments.length > 0) {
    items.push({ title: "Dashboard", href: "/dashboard" });

    if (segments.length > 1) {
      const routeName = segments[1];

      // Handle recipe routes specially
      if (routeName === "recipe" && segments.length > 2) {
        // Add recipe explorer
        items.push({
          title: "Recipe Explorer",
          href: "/dashboard/recipe-explorer",
        });

        // Add the specific recipe name
        const recipeName = recipeTitle || "Recipe";
        items.push({ title: recipeName, href: pathname });
      } else {
        // Handle other routes
        const formattedName = routeName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        items.push({ title: formattedName, href: pathname });
      }
    }
  }

  return items;
}

export default function BreadcrumbWrapper() {
  const pathname = usePathname();
  const [recipeTitle, setRecipeTitle] = useState<string>();

  // Fetch recipe title if we're on a recipe page
  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[1] === "recipe" && segments[2]) {
      const recipeId = segments[2];

      // Fetch recipe details to get the title
      fetch(`/api/recipes/${recipeId}`)
        .then((res) => res.json())
        .then((data) => {
          setRecipeTitle(data.title);
        })
        .catch((err) => {
          console.error("Failed to fetch recipe title:", err);
          setRecipeTitle("Recipe");
        });
    }
  }, [pathname]);

  const breadcrumbItems = getBreadcrumbItems(pathname, recipeTitle);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center">
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {index === breadcrumbItems.length - 1 ? (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator
                className={index === 0 ? "hidden md:block" : ""}
              />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
