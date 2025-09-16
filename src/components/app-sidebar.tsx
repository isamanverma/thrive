"use client";

import {
  Bell,
  BookOpen,
  ChefHat,
  Dumbbell,
  Heart,
  Home,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { getPendingUserData } from "@/lib/user-sync";
import { useTheme } from "next-themes";

// Profile button component
const ProfileButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const isActive = pathname === "/dashboard/profile";

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // If user not loaded or not authenticated, send to sign-in (Clerk will redirect back)
    if (!isLoaded || !user) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent("/onboarding")}`);
      return;
    }

    // If there is pending local onboarding data, consider user ready for dashboard
    const pending = getPendingUserData();
    if (pending) {
      router.push("/dashboard");
      return;
    }

    try {
      const res = await fetch(
        `/api/users?clerkId=${encodeURIComponent(user.id)}`
      );
      if (res.ok) {
        const data = await res.json();

        // If user exists and has required onboarding fields, go to dashboard
        if (data.exists && data.user) {
          const u = data.user;
          const hasOnboarding =
            u.age &&
            u.weight &&
            u.height &&
            (u.activityLevel || u.goals || u.diet_preference);

          if (hasOnboarding) {
            router.push("/dashboard");
            return;
          }
        }
      }

      // Otherwise, take user through onboarding
      router.push("/onboarding");
    } catch (err) {
      console.error("Error checking user onboarding status:", err);
      // On error, fall back to onboarding so user can complete profile (and onboarding saves locally if DB is down)
      router.push("/onboarding");
    }
  };

  return (
    <SidebarMenuButton
      asChild
      className={`hover:bg-muted rounded-lg p-3 ${
        isActive ? "bg-muted text-purple-600" : ""
      }`}
    >
      <a href="#" onClick={handleClick} className="flex items-center space-x-3">
        <User className="w-5 h-5 text-purple-600" />
        <span className="text-lg font-medium text-muted-foreground">Profile</span>
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger:
                "bg-transparent border-none shadow-none p-0 ml-auto",
              userButtonAvatarBox: "w-5 h-5",
            },
          }}
        />
      </a>
    </SidebarMenuButton>
  );
};

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Meal Plans",
    url: "/dashboard/meal-plans",
    icon: ChefHat,
  },
  {
    title: "Recipe Explorer",
    url: "/dashboard/recipe-explorer",
    icon: BookOpen,
  },
  {
    title: "Saved Recipes",
    url: "/dashboard/saved-recipes",
    icon: Heart,
  },
  {
    title: "Exercise Plans",
    url: "/dashboard/exercise-plans",
    icon: Dumbbell,
  },
  {
    title: "Exercise Explorer",
    url: "/dashboard/exercise-explorer",
    icon: Search,
  },
  {
    title: "Saved Exercises",
    url: "/dashboard/saved-exercises",
    icon: Heart,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  return (
    <Sidebar className="bg-sidebar border-r border-border">
      <SidebarHeader className="px-6 py-4 bg-sidebar border-b border-border">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="Thrive Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-foreground">Thrive</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-muted rounded-lg p-3 ${
                        isActive ? "bg-muted text-purple-600" : ""
                      }`}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center space-x-3"
                      >
                        <item.icon className="w-5 h-5 text-purple-600" />
                        <span
                          className={`text-lg font-medium ${isActive ? "text-purple-600" : "text-muted-foreground"}`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 bg-sidebar border-t border-border">
        <div className="flex flex-col space-y-3">
          {/* Theme (mode) toggle first — avoid using SidebarMenuItem (li) here to prevent stray list bullets */}
          <div className="flex">
            <DropdownMenu>
              <SidebarMenuButton asChild className="hover:bg-muted rounded-lg p-3">
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center w-full space-x-3">
                    <Sun className="w-5 h-5 text-purple-600" />
                    <span className="text-lg font-medium text-muted-foreground">
                      Theme
                    </span>
                  </button>
                </DropdownMenuTrigger>
              </SidebarMenuButton>
    
              <DropdownMenuContent align="end" side="top">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
    
          {/* Notifications */}
          <SidebarMenuButton
            asChild
            className={`hover:bg-muted rounded-lg p-3 ${
              pathname === "/dashboard/notifications"
                ? "bg-muted text-purple-500"
                : ""
            }`}
          >
            <Link
              href="/dashboard/notifications"
              className="flex items-center space-x-3"
            >
              <Bell className="w-5 h-5 text-purple-600" />
              <span
                className={`text-lg font-medium ${
                  pathname === "/dashboard/notifications"
                    ? "text-purple-600"
                    : "text-muted-foreground"
                }`}
              >
                Notifications
              </span>
            </Link>
          </SidebarMenuButton>
    
          {/* Settings */}
          <SidebarMenuButton
            asChild
            className={`hover:bg-muted rounded-lg p-3 ${
              pathname === "/dashboard/settings"
                ? "bg-muted text-primary"
                : ""
            }`}
          >
            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-3"
            >
              <Settings className="w-5 h-5 text-purple-600" />
              <span
                className={`text-lg font-medium ${
                  pathname === "/dashboard/settings"
                    ? "text-purple-600"
                    : "text-muted-foreground"
                }`}
              >
                Settings
              </span>
            </Link>
          </SidebarMenuButton>
    
          {/* Profile */}
          <div className="flex flex-col space-y-2">
            <div className="flex-1">
              <ProfileButton />
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
