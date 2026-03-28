import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf5]">
      <div className="relative w-48 h-48 mb-6">
        <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-20" />
        <Image
          src="/thrive mascots/bgRemoved/meditating Background Removed.png"
          alt="Loading"
          fill
          sizes="192px"
          className="relative z-10 object-contain animate-bounce"
          style={{ animationDuration: "1.5s" }}
          priority
        />
      </div>
      <p className="text-zinc-600 font-medium animate-pulse">
        Loading your dashboard...
      </p>
    </div>
  );
}
