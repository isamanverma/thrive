"use client";

import BentoFeatures from "@/components/landing/BentoFeatures";
import ProblemSection from "@/components/landing/sections/ProblemSection";
import HowItWorksSection from "@/components/landing/sections/HowItWorksSection";
import WeekGlanceSection from "@/components/landing/sections/WeekGlanceSection";
import BeforeAfterSection from "@/components/landing/sections/BeforeAfterSection";
import FinalCTASection from "@/components/landing/sections/FinalCTASection";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div className="min-h-[100dvh] bg-[#fffaf5] text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_16%_9%,rgba(251,146,60,0.10),transparent_32%),radial-gradient(circle_at_84%_5%,rgba(251,191,36,0.08),transparent_30%)]" />

      <header className="sticky top-0 z-30 border-b border-orange-200/70 bg-[#fffaf5]/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Thrive Logo"
              width={36}
              height={36}
              className="object-contain rounded-lg"
              priority
            />
            <span className="text-xl font-semibold tracking-tight text-zinc-900">
              Thrive
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            {isLoaded && isSignedIn ? (
              <Link
                href="/dashboard"
                className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-orange-50"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  Start free
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="px-5 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <h1 className="mt-6 max-w-[15ch] text-balance text-[clamp(2.25rem,5.6vw,4.7rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-zinc-900">
                stop guessing your meals and workouts
              </h1>

              <p className="mt-6 max-w-[48ch] text-[1.03rem] leading-relaxed text-zinc-600">
                Thrive connects your nutrition, training, and recovery into one
                weekly system — so every day has a clear plan.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  Preview dashboard
                </Link>
              </div>

              <p className="mt-5 text-xs text-zinc-500">
                builds your full week in under 3 minutes
              </p>
            </div>

            <aside className="space-y-8 rounded-[1.8rem] border border-orange-200/80 bg-white p-7 shadow-[0_40px_80px_-70px_rgba(234,88,12,0.5)] sm:p-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700">
                  today snapshot
                </p>
                <div className="mt-3 grid grid-cols-4 gap-4 text-center">
                  {[
                    ["active", "3"],
                    ["up", "2"],
                    ["waiting", "1"],
                    ["done", "6"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl bg-orange-50 px-2 py-3"
                    >
                      <p className="text-sm font-semibold text-zinc-900">
                        {value}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-zinc-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-orange-100 pt-6">
                <p className="text-sm font-semibold text-zinc-900">
                  health route generator
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  Pick your day type and Thrive composes meals + training with
                  one pass.
                </p>
                <div className="mt-3 space-y-2">
                  {[
                    "Breakfast: yogurt bowl + seeds · 420 kcal",
                    "Workout: lower body block · 45 min",
                    "Dinner: salmon wrap + greens · 610 kcal",
                  ].map((line) => (
                    <div
                      key={line}
                      className="rounded-lg bg-orange-50 px-3 py-2 text-xs text-zinc-700"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-between border-t border-orange-100 pt-6">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    monitor loop
                  </p>
                  <p className="mt-1 text-xs text-zinc-600">
                    average response 8.0s across recent checks
                  </p>
                </div>
                <Image
                  src="/thrive mascots/bgRemoved/showing plan Background Removed.png"
                  alt="Thrive mascot presenting plan"
                  width={74}
                  height={74}
                  className="h-16 w-16 object-contain opacity-90"
                  priority
                />
              </div>
            </aside>
          </div>
        </section>

        {/* ── Problem (animated) ──────────────────────────── */}
        <ProblemSection />

        {/* ── How It Works (scroll + video sync) ──────────── */}
        <HowItWorksSection />

        {/* ── Features (Bento Grid — untouched) ───────────── */}
        <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700">
                  features
                </p>
                <h2 className="mt-3 max-w-[20ch] text-balance text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.02] tracking-tight text-zinc-900">
                  the weekly control layer
                </h2>
              </div>
              <p className="max-w-[46ch] text-sm leading-relaxed text-zinc-600">
                One continuous workspace with clear hierarchy and whitespace,
                built for fast scanning and low friction decisions.
              </p>
            </div>

            <BentoFeatures />
          </div>
        </section>

        {/* ── Week at a Glance (interactive) ──────────────── */}
        <WeekGlanceSection />

        {/* ── Before vs After (animated) ──────────────────── */}
        <BeforeAfterSection />

        {/* ── Final CTA ───────────────────────────────────── */}
        <FinalCTASection />
      </main>

      <footer className="border-t border-orange-200/70 px-5 py-7 text-sm text-zinc-600 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>Thrive</p>
          <p>meal and workout planning for real life.</p>
        </div>
      </footer>
    </div>
  );
}
