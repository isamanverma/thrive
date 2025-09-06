"use client";

import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "#", label: "Home", active: true },
  { href: "#features", label: "Features", active: false },
  { href: "#pricing", label: "Pricing", active: false },
  { href: "/dashboard", label: "Dashboard", active: false },
];

export default function MagicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const handleSignInClick = () => {
    if (isSignedIn) {
      // If user is already signed in, redirect to dashboard
      router.push("/dashboard");
    }
    // If not signed in, the SignInButton will handle opening the modal
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>

            {/* Logo */}
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-primary hover:text-primary/90 flex items-center"
              >
                <Image
                  src="/logo.png"
                  alt="Thrive Logo"
                  width={40}
                  height={40}
                  className="object-contain mr-2"
                  priority
                />
                <span className="text-lg font-semibold text-gray-800">
                  Thrive
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex ml-8">
              <NavigationMenuList className="gap-6">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={link.href}
                      className={`text-sm font-medium transition-colors hover:text-green-600 ${
                        link.active ? "text-green-600" : "text-gray-600"
                      }`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center gap-2">
            {isSignedIn ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium"
                onClick={handleSignInClick}
              >
                Dashboard
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium"
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
            <SignUpButton mode="modal">
              <ShimmerButton
                className="h-9 px-4 text-sm"
                shimmerColor="#ffffff"
                background="linear-gradient(135deg, #10b981 0%, #059669 100%)"
              >
                Get Started
              </ShimmerButton>
            </SignUpButton>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <NavigationMenu className="w-full">
              <NavigationMenuList className="flex-col items-start gap-2 w-full">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index} className="w-full">
                    <NavigationMenuLink
                      href={link.href}
                      className={`block py-2 px-4 text-sm font-medium transition-colors hover:text-green-600 ${
                        link.active ? "text-green-600" : "text-gray-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </header>
  );
}
