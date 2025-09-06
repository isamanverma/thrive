"use client";

import {
  Bell,
  BookOpen,
  ChefHat,
  Dumbbell,
  Heart,
  Home,
  Search,
  Settings,
  User,
} from "lucide-react";
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

import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

// Profile button component
const ProfileButton = () => {
  const pathname = usePathname();
  const isActive = pathname === "/dashboard/profile";

  return (
    <SidebarMenuButton
      asChild
      className={`hover:bg-gray-100 rounded-lg p-3 ${
        isActive ? "bg-gray-100 text-green-600" : ""
      }`}
    >
      <Link href="/dashboard/profile" className="flex items-center space-x-3">
        <User className="w-5 h-5 text-green-600" />
        <span className="text-lg font-medium text-gray-700">Profile</span>
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger:
                "bg-transparent border-none shadow-none p-0 ml-auto",
              userButtonAvatarBox: "w-5 h-5",
            },
          }}
        />
      </Link>
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

  return (
    <Sidebar className="bg-gray-50 border-r border-gray-200">
      <SidebarHeader className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="Thrive Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-gray-800">Thrive</span>
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
                      className={`hover:bg-gray-100 rounded-lg p-3 ${
                        isActive ? "bg-gray-100 text-green-600" : ""
                      }`}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center space-x-3"
                      >
                        <item.icon
                          className={`w-5 h-5 ${isActive ? "text-green-600" : "text-green-600"}`}
                        />
                        <span
                          className={`text-lg font-medium ${isActive ? "text-green-600" : "text-gray-700"}`}
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
      <SidebarFooter className="p-4 bg-white border-t border-gray-200">
        <div className="flex flex-col space-y-3">
          <SidebarMenuButton
            asChild
            className={`hover:bg-gray-100 rounded-lg p-3 ${
              pathname === "/dashboard/notifications"
                ? "bg-gray-100 text-green-600"
                : ""
            }`}
          >
            <Link
              href="/dashboard/notifications"
              className="flex items-center space-x-3"
            >
              <Bell className="w-5 h-5 text-green-600" />
              <span
                className={`text-lg font-medium ${
                  pathname === "/dashboard/notifications"
                    ? "text-green-600"
                    : "text-gray-700"
                }`}
              >
                Notifications
              </span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton
            asChild
            className={`hover:bg-gray-100 rounded-lg p-3 ${
              pathname === "/dashboard/settings"
                ? "bg-gray-100 text-green-600"
                : ""
            }`}
          >
            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-3"
            >
              <Settings className="w-5 h-5 text-green-600" />
              <span
                className={`text-lg font-medium ${
                  pathname === "/dashboard/settings"
                    ? "text-green-600"
                    : "text-gray-700"
                }`}
              >
                Settings
              </span>
            </Link>
          </SidebarMenuButton>
          <ProfileButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
