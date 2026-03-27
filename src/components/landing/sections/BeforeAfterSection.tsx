"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const beforeItems = [
  "Random meals, no plan",
  "Skipped workouts by midweek",
  "Apps don't connect",
  "Restart every Monday",
];

const afterItems = [
  "Structured week, already planned",
  "Workouts matched to nutrition",
  "One system, one place to look",
  "Consistent week after week",
];

export default function BeforeAfterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeCardRef = useRef<HTMLDivElement>(null);
  const afterCardRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !beforeCardRef.current ||
        !afterCardRef.current
      ) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const beforeItemsEls =
            beforeCardRef.current?.querySelectorAll(".before-item");
          const afterItemsEls =
            afterCardRef.current?.querySelectorAll(".after-item");

          if (!beforeItemsEls || !afterItemsEls) return;

          gsap.set(beforeCardRef.current, {
            opacity: 1,
            xPercent: 0,
            scale: 1,
            filter: "blur(0px)",
          });

          gsap.set(afterCardRef.current, {
            opacity: 0.42,
            xPercent: 12,
            yPercent: 8,
            scale: 0.97,
            filter: "blur(0.6px)",
          });

          gsap.set(afterItemsEls, { opacity: 0.45, x: -8 });
          gsap.set(beforeItemsEls, { opacity: 1, x: 0 });
          gsap.set(bridgeRef.current, { opacity: 0.2, scaleX: 0.75 });

          const tl = gsap.timeline({
            defaults: {
              duration: 1,
              ease: "power3.out",
            },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 0.4,
              snap: {
                snapTo: [0, 0.5, 1],
                duration: { min: 0.12, max: 0.24 },
                ease: "power1.inOut",
              },
            },
          });

          tl.to(
            beforeCardRef.current,
            {
              xPercent: -10,
              opacity: 0.7,
              scale: 0.985,
            },
            0,
          )
            .to(
              afterCardRef.current,
              {
                xPercent: 0,
                yPercent: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              },
              0,
            )
            .to(
              afterItemsEls,
              {
                opacity: 1,
                x: 0,
                stagger: 0.08,
              },
              0.06,
            )
            .to(
              beforeItemsEls,
              {
                opacity: 0.72,
                x: -6,
                stagger: 0.04,
              },
              0.08,
            )
            .to(
              bridgeRef.current,
              {
                opacity: 1,
                scaleX: 1,
              },
              0.15,
            )
            .to(
              beforeCardRef.current,
              {
                xPercent: -2,
                opacity: 0.86,
                scale: 1,
                filter: "blur(0px)",
              },
              1,
            )
            .to(
              beforeItemsEls,
              {
                opacity: 0.84,
                x: 0,
                stagger: 0.03,
              },
              1,
            )
            .to(
              afterCardRef.current,
              {
                opacity: 1,
                xPercent: 0,
                yPercent: 0,
              },
              1,
            );
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700">
          the shift
        </p>
        <h2 className="mt-3 max-w-[24ch] text-balance text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.02] tracking-tight text-zinc-900">
          what changes with Thrive
        </h2>

        <div className="mt-6 hidden lg:block">
          <div className="mb-5 flex items-center gap-4 px-1">
            <div className="h-px flex-1 bg-zinc-200/80" />
            <div
              ref={bridgeRef}
              className="origin-center text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500"
            >
              chaos to system
            </div>
            <div className="h-px flex-1 bg-zinc-200/80" />
          </div>

          <div className="grid min-h-[66vh] items-center gap-10 md:grid-cols-2 md:gap-14">
            <div
              ref={beforeCardRef}
              className="rounded-2xl border border-zinc-200/80 bg-white/70 p-7"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                before thrive
              </p>
              <div className="mt-7 space-y-5">
                {beforeItems.map((item) => (
                  <div
                    key={item}
                    className="before-item flex items-start gap-3"
                  >
                    <span className="mt-0.5 text-sm text-zinc-300">×</span>
                    <span className="text-sm text-zinc-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={afterCardRef}
              className="rounded-2xl border border-orange-200/60 bg-orange-50/55 p-7 shadow-[0_26px_60px_-42px_rgba(249,115,22,0.5)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-600">
                after thrive
              </p>
              <div className="mt-7 space-y-5">
                {afterItems.map((item) => (
                  <div key={item} className="after-item flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-zinc-900">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20 lg:hidden">
          <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
              before thrive
            </p>
            <div className="mt-7 space-y-5">
              {beforeItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 text-sm text-zinc-300">×</span>
                  <span className="text-sm text-zinc-500">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200/60 bg-orange-50/55 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-600">
              after thrive
            </p>
            <div className="mt-7 space-y-5">
              {afterItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-zinc-900">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
