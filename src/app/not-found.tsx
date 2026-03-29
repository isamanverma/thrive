"use client";

import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="relative w-56 h-56 mb-2">
        <Image
          src="/thrive mascots/bgRemoved/looking at fridge Background Removed.png"
          alt="Thrive mascot looking confused"
          fill
          sizes="224px"
          className="object-contain"
          priority
        />
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-3">
        something&apos;s missing
      </p>

      <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight text-foreground leading-none">
        404
      </h1>

      <p className="mt-4 max-w-[36ch] text-lg text-muted-foreground leading-relaxed">
        opened the fridge, checked every shelf — this page just isn&apos;t here.
      </p>

      <button
        onClick={() => window.history.go(-1)}
        className="mt-10 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        go back
      </button>
    </div>
  );
}
