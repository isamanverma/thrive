"use client";

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MagicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/40 bg-background/80 backdrop-blur-xl"
          : "bg-background/95"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-14 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Thrive"
              width={32}
              height={32}
              className="object-contain rounded-md"
              priority
            />
            <span className="text-base font-semibold text-foreground">
              Thrive
            </span>
          </a>

          <div className="flex items-center gap-2">
            <ModeToggle />
            {!isLoaded ? null : isSignedIn ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="text-sm font-medium">
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
