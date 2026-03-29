"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  stats: [string, string][];
  chartType:
    | "timeline"
    | "donut"
    | "bars"
    | "checklist"
    | "comparison"
    | "gauge";
  className: string;
};

function TimelineChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  const hours = [
    { time: "7:00", label: "Breakfast", color: "bg-orange-400", icon: "🍳" },
    { time: "10:30", label: "Snack", color: "bg-orange-300", icon: "🍎" },
    { time: "13:00", label: "Lunch", color: "bg-orange-500", icon: "🥗" },
    { time: "16:00", label: "Workout", color: "bg-orange-600", icon: "🏋️" },
    { time: "19:00", label: "Dinner", color: "bg-orange-400", icon: "🍲" },
    { time: "22:00", label: "Recovery", color: "bg-orange-200", icon: "😴" },
  ];

  useGSAP(
    () => {
      if (!chartRef.current) return;
      const items = chartRef.current.querySelectorAll(".timeline-item");
      const card = chartRef.current.closest("article");
      if (!card) return;

      const show = () => {
        gsap.killTweensOf(items);
        gsap.to(items, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const hide = () => {
        gsap.killTweensOf(items);
        gsap.to(items, {
          opacity: 0,
          x: 10,
          duration: 0.25,
          stagger: 0.04,
          ease: "power2.in",
          overwrite: true,
        });
      };

      card.addEventListener("mouseenter", show);
      card.addEventListener("mouseleave", hide);
    },
    { scope: chartRef },
  );

  return (
    <div ref={chartRef} className="relative h-full w-full">
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-orange-200" />
      {hours.map((item, i) => (
        <div
          key={i}
          className="timeline-item absolute left-0 flex w-full items-center gap-3 opacity-0"
          style={{ top: `${i * 16 + 5}%`, transform: "translateX(-20px)" }}
        >
          <div
            className={cn(
              "relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-lg",
              item.color,
            )}
          >
            {item.icon}
          </div>
          <div className="flex flex-1 items-center justify-between rounded-lg bg-primary/10 px-3 py-2">
            <div>
              <span className="text-xs font-semibold text-foreground">
                {item.label}
              </span>
              <span className="ml-2 text-[10px] text-primary">{item.time}</span>
            </div>
            <div className="h-1.5 flex-1 mx-3 rounded-full bg-primary/15 overflow-hidden">
              <div
                className={cn("h-full rounded-full", item.color)}
                style={{ width: `${65 + i * 5}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DonutChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  const r = 40;
  const circ = 2 * Math.PI * r;
  const segments = [
    { label: "Protein", pct: 40, color: "#f97316", bg: "#fed7aa" },
    { label: "Carbs", pct: 25, color: "#fb923c", bg: "#ffedd5" },
    { label: "Fat", pct: 35, color: "#fdba74", bg: "#fff7ed" },
  ];

  const segData = (() => {
    let offset = 0;
    return segments.map((seg) => {
      const len = (seg.pct / 100) * circ;
      const gap = circ - len;
      const result = { ...seg, dasharray: `${len} ${gap}`, offset };
      offset -= len;
      return result;
    });
  })();

  useGSAP(
    () => {
      if (!chartRef.current) return;
      const rings = chartRef.current.querySelectorAll(".pie-ring");
      const card = chartRef.current.closest("article");
      if (!card) return;

      const show = () => {
        gsap.killTweensOf(rings);
        rings.forEach((el, i) => {
          const full = (el as SVGElement).dataset.full || "0 251.33";
          gsap.to(el, {
            attr: { "stroke-dasharray": full },
            duration: 0.6,
            delay: i * 0.15,
            ease: "power3.out",
            overwrite: true,
          });
        });
      };

      const hide = () => {
        gsap.killTweensOf(rings);
        rings.forEach((el, i) => {
          gsap.to(el, {
            attr: { "stroke-dasharray": "0 251.33" },
            duration: 0.35,
            delay: i * 0.05,
            ease: "power2.in",
            overwrite: true,
          });
        });
      };

      card.addEventListener("mouseenter", show);
      card.addEventListener("mouseleave", hide);
    },
    { scope: chartRef },
  );

  return (
    <div
      ref={chartRef}
      className="flex h-full items-center justify-center gap-6 pb-6"
    >
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          {segData.map((seg, i) => (
            <circle
              key={i}
              className="pie-ring"
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="20"
              strokeDasharray="0 251.33"
              strokeDashoffset={seg.offset}
              strokeLinecap="butt"
              data-full={seg.dasharray}
            />
          ))}
        </svg>
      </div>
      <div className="space-y-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-sm text-muted-foreground">
              {seg.label}{" "}
              <span className="font-bold text-foreground">{seg.pct}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarsChart() {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      const bars = cardRef.current.querySelectorAll(".bar-item");
      const card = cardRef.current.closest("article");
      if (!card) return;

      gsap.fromTo(
        bars,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        },
      );

      card.addEventListener("mouseenter", () => {
        gsap.killTweensOf(bars);
        gsap.to(bars, {
          scaleY: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: "power2.out",
          overwrite: true,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.killTweensOf(bars);
        gsap.to(bars, {
          scaleY: 0.15,
          duration: 0.25,
          stagger: 0.03,
          ease: "power2.in",
          overwrite: true,
        });
      });
    },
    { scope: cardRef },
  );

  const weekData = [
    { day: "Mon", value: 92, status: "perfect" },
    { day: "Tue", value: 78, status: "good" },
    { day: "Wed", value: 95, status: "perfect" },
    { day: "Thu", value: 88, status: "good" },
    { day: "Fri", value: 100, status: "perfect" },
    { day: "Sat", value: 65, status: "low" },
    { day: "Sun", value: 72, status: "good" },
  ];

  return (
    <div ref={cardRef} className="flex h-full flex-col">
      <div className="flex flex-1 items-end justify-between gap-1.5 px-3 pb-1 pt-2">
        {weekData.map((day, i) => (
          <div key={i} className="flex flex-1 flex-col items-center">
            <span className="mb-1 text-[9px] font-bold text-orange-600 opacity-0 transition-opacity group-hover:opacity-100">
              {day.value}
            </span>
            <div
              className="relative flex w-full flex-col items-center justify-end overflow-hidden rounded-t-sm"
              style={{ height: "140px" }}
            >
              <div
                className={cn(
                  "bar-item w-full max-w-6 rounded-t-sm origin-bottom",
                  day.status === "perfect"
                    ? "bg-orange-500"
                    : day.status === "good"
                      ? "bg-orange-400"
                      : "bg-orange-300",
                )}
                style={{
                  height: `${day.value * 1.4}px`,
                  minHeight: "4px",
                  transform: "scaleY(0)",
                }}
              />
            </div>
            <span className="mt-1.5 text-[10px] font-medium text-muted-foreground">
              {day.day}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 border-t border-primary/10 pt-2 text-[9px]">
        <span className="flex items-center gap-1 text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-orange-500" /> Perfect
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-orange-400" /> Good
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-orange-300" /> Low
        </span>
      </div>
    </div>
  );
}

function ChecklistChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!chartRef.current) return;
      const items = chartRef.current.querySelectorAll(".checklist-item");
      const checks = chartRef.current.querySelectorAll(".check-icon");
      const card = chartRef.current.closest("article");
      if (!card) return;

      const showList = () => {
        gsap.killTweensOf([items, checks]);
        gsap.fromTo(
          items,
          { x: 24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.07,
            ease: "power3.out",
            overwrite: true,
          },
        );
        gsap.fromTo(
          checks,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            stagger: 0.07,
            delay: 0.15,
            ease: "back.out(3)",
            overwrite: true,
          },
        );
      };

      const hideList = () => {
        gsap.killTweensOf([items, checks]);
        gsap.to(items, {
          x: 12,
          opacity: 0,
          duration: 0.2,
          stagger: 0.03,
          ease: "power2.in",
          overwrite: true,
        });
        gsap.to(checks, {
          scale: 0,
          opacity: 0,
          duration: 0.15,
          stagger: 0.03,
          ease: "power2.in",
          overwrite: true,
        });
      };

      card.addEventListener("mouseenter", showList);
      card.addEventListener("mouseleave", hideList);
    },
    { scope: chartRef },
  );

  const items = [
    { name: "Chicken breast", checked: true, category: "Protein" },
    { name: "Broccoli", checked: true, category: "Vegetable" },
    { name: "Brown rice", checked: true, category: "Carbs" },
    { name: "Greek yogurt", checked: false, category: "Dairy" },
    { name: "Almonds", checked: false, category: "Fats" },
  ];

  return (
    <div ref={chartRef} className="space-y-1.5 py-1">
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "checklist-item flex items-center gap-3 rounded-lg px-3 py-2 opacity-0",
            item.checked
              ? "bg-primary/10 border border-primary/20"
              : "bg-muted border border-border",
          )}
        >
          <div
            className={cn(
              "check-icon flex h-5 w-5 items-center justify-center rounded border",
              item.checked
                ? "border-orange-500 bg-orange-500"
                : "border-zinc-300",
            )}
          >
            {item.checked && (
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
            )}
          </div>
          <span
            className={cn(
              "flex-1 font-medium",
              item.checked ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {item.name}
          </span>
          <span
            className={cn(
              "text-[10px] px-2 py-0.5 rounded-full",
              item.checked
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            {item.category}
          </span>
        </div>
      ))}
    </div>
  );
}

function ComparisonChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!chartRef.current) return;
      const arrow = chartRef.current.querySelector(".arrow-icon");
      const beforeBars = chartRef.current.querySelectorAll(".before-bar");
      const afterBars = chartRef.current.querySelectorAll(".after-bar");

      gsap.fromTo(
        arrow,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.1 },
      );
      gsap.fromTo(
        beforeBars,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.2,
        },
      );
      gsap.fromTo(
        afterBars,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.35,
        },
      );
    },
    { scope: chartRef },
  );

  const before = [
    { day: "M", value: 45 },
    { day: "T", value: 55 },
    { day: "W", value: 50 },
    { day: "T", value: 45 },
  ];
  const after = [
    { day: "M", value: 70 },
    { day: "T", value: 80 },
    { day: "W", value: 75 },
    { day: "T", value: 85 },
  ];

  return (
    <div
      ref={chartRef}
      className="flex h-full items-center justify-center gap-4"
    >
      <div className="flex-1 space-y-2">
        <div className="text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Before
          </div>
        </div>
        <div className="flex items-end justify-center gap-1">
          {before.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="before-bar w-4 rounded-t-sm bg-muted-foreground/30 origin-bottom"
                style={{ height: `${item.value}%`, transform: "scaleY(0)" }}
              />
              <span className="text-[9px] text-muted-foreground">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <svg
          className="arrow-icon h-8 w-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
        <div className="text-[9px] font-medium text-primary">REBALANCE</div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            After
          </div>
        </div>
        <div className="flex items-end justify-center gap-1">
          {after.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="after-bar w-4 rounded-t-sm bg-primary origin-bottom"
                style={{ height: `${item.value}%`, transform: "scaleY(0)" }}
              />
              <span className="text-[9px] text-muted-foreground">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GaugeChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef(75);
  const maxArc = 126;

  useGSAP(
    () => {
      if (!chartRef.current) return;
      const gaugeFill = chartRef.current.querySelector(".gauge-fill");
      const indicatorPills =
        chartRef.current.querySelectorAll(".indicator-pill");
      const card = chartRef.current.closest("article");
      if (!card || !gaugeFill) return;

      const show = () => {
        gsap.killTweensOf([gaugeFill, indicatorPills]);
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: fillRef.current,
          duration: 0.8,
          ease: "power2.out",
          overwrite: true,
          onUpdate: () => {
            const filled = (proxy.val / 100) * maxArc;
            (gaugeFill as SVGElement).setAttribute(
              "stroke-dasharray",
              `${filled} ${maxArc}`,
            );
          },
        });
        gsap.to(indicatorPills, {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          stagger: 0.08,
          delay: 0.3,
          ease: "back.out(1.7)",
          overwrite: true,
        });
      };

      const hide = () => {
        gsap.killTweensOf([gaugeFill, indicatorPills]);
        const proxy = { val: fillRef.current };
        gsap.to(proxy, {
          val: 0,
          duration: 0.4,
          ease: "power2.in",
          overwrite: true,
          onUpdate: () => {
            const filled = (proxy.val / 100) * maxArc;
            (gaugeFill as SVGElement).setAttribute(
              "stroke-dasharray",
              `${filled} ${maxArc}`,
            );
          },
        });
        gsap.to(indicatorPills, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          stagger: 0.04,
          ease: "power2.in",
          overwrite: true,
        });
      };

      card.addEventListener("mouseenter", show);
      card.addEventListener("mouseleave", hide);
    },
    { scope: chartRef },
  );

  return (
    <div
      ref={chartRef}
      className="flex h-full flex-col items-center justify-center pb-6"
    >
      <div className="relative">
        <svg viewBox="0 0 100 50" className="h-24 w-48">
          <path
            d="M10 50 A40 40 0 0 1 90 50"
            fill="none"
            stroke="#fed7aa"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            className="gauge-fill"
            d="M10 50 A40 40 0 0 1 90 50"
            fill="none"
            stroke="#f97316"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="0 126"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <div className="text-xl font-bold text-foreground">High</div>
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        {[
          { label: "Sleep", value: "7.5h", color: "bg-green-500" },
          { label: "HRV", value: "65ms", color: "bg-orange-500" },
          { label: "Sore", value: "Low", color: "bg-green-400" },
        ].map((item, i) => (
          <div
            key={i}
            className="indicator-pill flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1"
            style={{ opacity: 0, transform: "scale(0)" }}
          >
            <div className={cn("h-1.5 w-1.5 rounded-full", item.color)} />
            <span className="text-[9px] font-medium text-muted-foreground">
              {item.label}
            </span>
            <span className="text-[9px] font-bold text-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const CHARTS = {
  timeline: TimelineChart,
  donut: DonutChart,
  bars: BarsChart,
  checklist: ChecklistChart,
  comparison: ComparisonChart,
  gauge: GaugeChart,
};

function FeatureTile({
  title,
  description,
  stats,
  chartType,
  className,
}: FeatureCard) {
  const cardRef = useRef<HTMLDivElement>(null);
  const descStatsRef = useRef<HTMLDivElement>(null);
  const chartBlockRef = useRef<HTMLDivElement>(null);

  const ChartComponent = CHARTS[chartType];

  useGSAP(
    () => {
      if (!cardRef.current) return;

      const card = cardRef.current;
      const descStats = descStatsRef.current;
      const chartBlock = chartBlockRef.current;

      card.addEventListener("mouseenter", () => {
        gsap.killTweensOf([descStats, chartBlock]);
        gsap.to(descStats, {
          y: 12,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          overwrite: true,
        });
        gsap.to(chartBlock, {
          y: 0,
          opacity: 1,
          duration: 0.25,
          delay: 0.06,
          ease: "power3.out",
          overwrite: true,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.killTweensOf([descStats, chartBlock]);
        gsap.to(chartBlock, {
          y: 15,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          overwrite: true,
        });
        gsap.to(descStats, {
          y: 0,
          opacity: 1,
          duration: 0.2,
          delay: 0.04,
          ease: "power2.out",
          overwrite: true,
        });
      });
    },
    { scope: cardRef },
  );

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-shadow duration-300 hover:shadow-lg dark:shadow-black/30 dark:hover:shadow-black/40",
        className,
      )}
    >
      <div className="flex h-full flex-col p-5">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>

        <div className="relative mt-2 flex-1">
          <div ref={descStatsRef} className="flex flex-col">
            <p className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              {stats.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-foreground"
                >
                  <span className="text-muted-foreground">{label}</span>
                  {" · "}
                  <span className="font-semibold text-primary">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={chartBlockRef}
            className="absolute inset-0 flex flex-col opacity-0"
          >
            <div className="flex-1">
              <ChartComponent />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

const features: FeatureCard[] = [
  {
    id: "day-map",
    title: "Unified day map",
    description:
      "Meals, sessions, and recovery windows stay sequenced in one clear timeline.",
    stats: [
      ["meals", "5/day"],
      ["sync", "auto"],
    ],
    chartType: "timeline",
    className: "lg:col-span-6 lg:row-span-2 min-h-[250px] lg:min-h-[380px]",
  },
  {
    id: "macro-load",
    title: "macro and load calibration",
    description: "Nutrition targets adjust around planned training intensity.",
    stats: [
      ["protein", "146g"],
      ["calories", "2,400"],
    ],
    chartType: "donut",
    className: "lg:col-span-6 min-h-[180px]",
  },
  {
    id: "grocery",
    title: "grocery sync",
    description: "Selected meals collapse into grouped smart shopping lists.",
    stats: [
      ["items", "12"],
      ["categories", "4"],
    ],
    chartType: "checklist",
    className: "lg:col-span-6 min-h-[180px]",
  },
  {
    id: "consistency",
    title: "consistency signal",
    description: "Your strongest repeatable habits are surfaced each week.",
    stats: [
      ["streak", "11 days"],
      ["variance", "low"],
    ],
    chartType: "bars",
    className: "lg:col-span-6 min-h-[180px]",
  },
  {
    id: "recovery",
    title: "recovery readout",
    description: "Simple cues keep push days and rest days in healthy rhythm.",
    stats: [
      ["readiness", "high"],
      ["sleep", "7.5h"],
    ],
    chartType: "gauge",
    className: "lg:col-span-6 min-h-[180px]",
  },
];

export default function BentoFeatures() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
        {features.map((feature) => (
          <FeatureTile key={feature.id} {...feature} />
        ))}
      </div>
    </section>
  );
}
