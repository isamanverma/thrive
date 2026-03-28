"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    number: "01",
    title: "Set your goal",
    desc: "Tell Thrive what you're working toward — fat loss, muscle gain, or just staying consistent.",
    video: "/videos/goal.mp4",
    fallback: "/thrive mascots/bgRemoved/thinking Background Removed.png",
  },
  {
    number: "02",
    title: "Thrive builds your week",
    desc: "Meals, workouts, and recovery are planned together around your schedule.",
    video: "/videos/build.mp4",
    fallback: "/thrive mascots/bgRemoved/showing plan Background Removed.png",
  },
  {
    number: "03",
    title: "You just follow",
    desc: "Your plan, synced to groceries and clear day-by-day actions.",
    video: "/videos/follow.mp4",
    fallback:
      "/thrive mascots/bgRemoved/checkmark on calendar with a meal Background Removed.png",
  },
];

function VideoClip({
  src,
  fallbackSrc,
  active = true,
}: {
  src: string;
  fallbackSrc: string;
  active?: boolean;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <Image
        src={fallbackSrc}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-contain"
        priority={active}
      />
    </div>
  );
}

function StepIndicator({ active, total }: { active: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === active ? "w-6 bg-orange-500" : "w-1.5 bg-zinc-300"
          }`}
        />
      ))}
      <span className="ml-2 text-[11px] font-medium text-zinc-400">
        {active + 1}/{total}
      </span>
    </div>
  );
}

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const jumpToStep = useCallback((stepIndex: number) => {
    const st = scrollTriggerRef.current;

    if (!st) {
      setActiveStep(stepIndex);
      return;
    }

    const clamped = Math.max(0, Math.min(stepIndex, steps.length - 1));
    const targetProgress = clamped / (steps.length - 1);
    const targetY = st.start + (st.end - st.start) * targetProgress;

    setActiveStep(clamped);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!isDesktop || prefersReducedMotion) {
        setActiveStep(0);
        return;
      }

      const layers = videoLayerRefs.current.filter(Boolean) as HTMLDivElement[];

      if (layers.length !== steps.length) return;

      gsap.set(layers, { yPercent: 100, autoAlpha: 0 });
      gsap.set(layers[0], { yPercent: 0, autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.35,
          snap: {
            snapTo: [0, 0.5, 1],
            duration: { min: 0.12, max: 0.25 },
            delay: 0.05,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const progress = self.progress;
            const nextStep = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2;
            setActiveStep((prev) => (prev === nextStep ? prev : nextStep));
          },
        },
      });

      tl.to(layers[0], { yPercent: -35, autoAlpha: 0 }, 0).to(
        layers[1],
        { yPercent: 0, autoAlpha: 1 },
        0,
      );

      tl.to(layers[1], { yPercent: -35, autoAlpha: 0 }, 1).to(
        layers[2],
        { yPercent: 0, autoAlpha: 1 },
        1,
      );

      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      return () => {
        scrollTriggerRef.current = null;
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative bg-[#fffaf5]">
      <div className="mx-auto hidden h-screen w-full max-w-6xl lg:grid lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-center px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700">
            how it works
          </p>
          <h2 className="mt-3 text-balance text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.02] tracking-tight text-zinc-900">
            3 steps to a structured week
          </h2>

          <div className="mt-9 space-y-3">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => jumpToStep(index)}
                  className={`rounded-2xl border px-4 py-4 transition-all duration-300 ${
                    isActive
                      ? "border-orange-300 bg-orange-50/70 shadow-[0_8px_32px_-24px_rgba(249,115,22,0.8)]"
                      : "border-zinc-200/70 bg-white/55"
                  } w-full cursor-pointer text-left`}
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                      isActive ? "text-orange-600" : "text-zinc-400"
                    }`}
                  >
                    step {step.number}
                  </p>
                  <p
                    className={`mt-1 text-xl font-semibold tracking-tight transition-colors ${
                      isActive ? "text-zinc-900" : "text-zinc-600"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p
                    className={`mt-2 text-[0.95rem] leading-relaxed transition-colors ${
                      isActive ? "text-zinc-700" : "text-zinc-500"
                    }`}
                  >
                    {step.desc}
                  </p>
                </button>
              );
            })}

            <div className="pt-1">
              <StepIndicator active={activeStep} total={steps.length} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-8">
          <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200/60 bg-zinc-50">
            <div className="pointer-events-none absolute inset-0 z-20 bg-white/[0.02] backdrop-blur-[1px]" />

            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  videoLayerRefs.current[index] = el;
                }}
                className="absolute inset-0"
              >
                <VideoClip
                  src={step.video}
                  fallbackSrc={step.fallback}
                  active={activeStep === index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:hidden">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-700">
          how it works
        </p>
        <h2 className="mt-3 text-balance text-[clamp(1.8rem,7vw,2.3rem)] font-semibold leading-[1.05] tracking-tight text-zinc-900">
          3 steps to a structured week
        </h2>

        <div className="mt-8 space-y-3">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => jumpToStep(index)}
                className={`rounded-2xl border px-4 py-4 transition-all duration-300 ${
                  isActive
                    ? "border-orange-300 bg-orange-50/70"
                    : "border-zinc-200/70 bg-white/55"
                } w-full cursor-pointer text-left`}
              >
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    isActive ? "text-orange-600" : "text-zinc-400"
                  }`}
                >
                  step {step.number}
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-zinc-900">
                  {step.title}
                </p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-zinc-600">
                  {step.desc}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <StepIndicator active={activeStep} total={steps.length} />
        </div>

        <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200/60 bg-zinc-50">
          <VideoClip
            src={steps[activeStep].video}
            fallbackSrc={steps[activeStep].fallback}
          />
        </div>
      </div>
    </section>
  );
}
