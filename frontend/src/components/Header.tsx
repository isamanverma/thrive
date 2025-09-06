import { SignInButton, SignUpButton } from "@clerk/nextjs";

import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 px-10 py-4">
      <div className="flex items-center gap-3">
        <Image
          src="/logo_full.png"
          alt="Thrive Logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>
      <nav className="flex items-center gap-8">
        <a
          className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium transition-colors"
          href="#"
        >
          Discover
        </a>
        <a
          className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium transition-colors"
          href="#"
        >
          Meal Plans
        </a>
        <a
          className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium transition-colors"
          href="#"
        >
          How it Works
        </a>
      </nav>
      <div className="flex items-center gap-2">
        <SignInButton mode="modal">
          <button className="button_secondary">
            <span className="truncate">Log In</span>
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="button_primary">
            <span className="truncate">Sign Up</span>
          </button>
        </SignUpButton>
      </div>
    </header>
  );
}
