"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseActiveIndexOptions = {
  length: number;
  intervalMs?: number;
  autoStart?: boolean;
};

export function useActiveIndex({
  length,
  intervalMs = 1500,
  autoStart = true,
}: UseActiveIndexOptions) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clear();
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, intervalMs);
  }, [clear, intervalMs, length]);

  const pause = useCallback(() => {
    setPaused(true);
    clear();
  }, [clear]);

  const resume = useCallback(() => {
    setPaused(false);
    start();
  }, [start]);

  const setIndexTo = useCallback(
    (i: number) => {
      setIndex(((i % length) + length) % length);
      if (!paused) {
        clear();
        start();
      }
    },
    [length, paused, clear, start],
  );

  useEffect(() => {
    if (autoStart && !paused) start();
    return clear;
  }, [autoStart, paused, start, clear]);

  return { index, paused, pause, resume, setIndexTo };
}
