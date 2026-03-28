"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTASection() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <section className="relative overflow-hidden px-5 py-32 sm:px-6 lg:px-8 lg:py-48">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-transparent to-amber-50/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-3xl text-center">
        {isSignedIn ? (
          <>
            <div className="relative w-32 h-32 mx-auto mb-8">
              <Image
                src="/thrive mascots/bgRemoved/thumbs up Background Removed.png"
                alt="Thrive mascot giving thumbs up"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Ready to crush this week?
            </div>
            <p className="text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.04] tracking-tight text-zinc-900">
              your momentum is building
            </p>
            <p className="mx-auto mt-5 max-w-[48ch] text-[1.03rem] leading-relaxed text-zinc-600">
              You&apos;ve started something great. Keep the streak alive and
              make this your best week yet.
            </p>
            <Link
              href="/dashboard"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 hover:scale-105"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        ) : (
          <>
            <div className="relative w-40 h-40 mx-auto mb-8 -mt-4">
              <Image
                src="/thrive mascots/bgRemoved/showing plan Background Removed.png"
                alt="Thrive mascot showing plan"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.04] tracking-tight text-zinc-900">
              your best week starts now
            </p>
            <p className="mx-auto mt-5 max-w-[48ch] text-[1.03rem] leading-relaxed text-zinc-600">
              Set your targets, choose your rhythm, and let Thrive handle the
              rest.
            </p>
            <Link
              href="/sign-up"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 hover:scale-105"
            >
              Build my first week — free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-5 text-xs text-zinc-500">
              Takes ~3 minutes. No setup overhead.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
