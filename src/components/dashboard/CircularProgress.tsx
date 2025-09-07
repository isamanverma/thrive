"use client";

import { useEffect, useRef } from "react";

interface CircularProgressProps {
  percentage: number;
  color: string;
  label: string;
  size?: number;
}

export function CircularProgress({
  percentage,
  color,
  label,
  size = 128,
}: CircularProgressProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size - 20) / 2;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 8;
    ctx.stroke();

    // Progress circle
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (percentage / 100) * 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.stroke();
  }, [percentage, color, size]);

  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <canvas ref={canvasRef} width={size} height={size} className="block" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>
            {percentage}%
          </span>
          <span className="text-xs text-gray-500">{label}</span>
        </div>
      </div>
    </div>
  );
}
