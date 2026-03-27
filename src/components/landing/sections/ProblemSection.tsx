"use client";

import { useInView } from "@/hooks/useInView";

const scatteredCards = [
  { label: "Calorie tracker", icon: "📊" },
  { label: "Workout app", icon: "🏋️" },
  { label: "Notes", icon: "📝" },
];

export default function ProblemSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-5 py-28 sm:px-6 lg:px-8 lg:py-36"
    >
      {/* Subtle depth background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(140,100,255,0.06),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          {/* ── Left: text ─────────────────────────────── */}
          <div
            className={`transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700">
              the problem
            </p>
            <h2 className="mt-3 max-w-[28ch] text-balance text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.02] tracking-tight text-zinc-900">
              tracking food, workouts, and recovery separately breaks
              consistency
            </h2>
            <p className="mt-5 max-w-[48ch] text-[1.03rem] leading-relaxed text-zinc-600">
              You use 3 different apps with no shared context. You plan on
              Monday, abandon by Wednesday, and restart next week.
            </p>
          </div>

          {/* ── Right: scattered → unified visual ──────── */}
          <div
            className={`relative flex flex-col items-center transition-all duration-700 delay-200 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* 3 scattered floating cards */}
            <div className="flex w-full max-w-[380px] justify-center gap-4">
              {scatteredCards.map((card, i) => (
                <div
                  key={card.label}
                  className={`problem-float-${i + 1} flex flex-1 flex-col items-center gap-2.5 rounded-2xl border border-zinc-200 bg-white px-3 py-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.10)]`}
                >
                  <span className="text-2xl">{card.icon}</span>
                  <span className="text-center text-[11px] font-medium text-zinc-500">
                    {card.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── separator: "no connection" ──────────── */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="h-px w-16 bg-zinc-200" />
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-400">
                no connection
              </span>
              <div className="h-px w-16 bg-zinc-200" />
            </div>

            {/* ── arrow ──────────────────────────────── */}
            <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-orange-50">
              <svg
                className="h-3.5 w-3.5 text-orange-500"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </div>

            {/* ── Unified Thrive card ────────────────── */}
            <div className="mt-5 flex w-[220px] flex-col items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50/80 px-6 py-7 shadow-[0_16px_50px_-20px_rgba(234,88,12,0.20)]">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-orange-200 bg-white">
                <div className="h-3.5 w-3.5 rounded-full bg-orange-500" />
              </div>
              <p className="text-base font-semibold text-zinc-900">Thrive</p>
              <p className="-mt-1 text-[11px] text-zinc-500">one system</p>

              {/* Mini icon row showing it contains everything */}
              <div className="mt-1 flex gap-2">
                {["📊", "🏋️", "📝"].map((icon) => (
                  <span
                    key={icon}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-orange-100 bg-white text-sm"
                  >
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
