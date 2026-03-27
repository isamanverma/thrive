"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type UseInViewOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {},
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: options.threshold ?? 0.5,
        rootMargin: options.rootMargin ?? "0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, inView];
}
