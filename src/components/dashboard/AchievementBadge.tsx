"use client";

interface AchievementBadgeProps {
  icon: React.ReactNode;
  title: string;
  isUnlocked?: boolean;
}

export function AchievementBadge({
  icon,
  title,
  isUnlocked = true,
}: AchievementBadgeProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 text-center flex-shrink-0 ${
        !isUnlocked ? "opacity-50" : ""
      }`}
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isUnlocked
            ? "bg-yellow-100 text-yellow-500"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {icon}
      </div>
      <p className="text-sm font-semibold">{title}</p>
    </div>
  );
}
