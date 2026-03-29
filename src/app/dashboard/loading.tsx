import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="relative w-48 h-48 mb-6">
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" />
        <Image
          src="/thrive mascots/bgRemoved/cooking Background Removed.png"
          alt="Thrive mascot preparing healthy food"
          fill
          sizes="192px"
          className="relative z-10 object-contain animate-bounce"
          style={{ animationDuration: "1.5s" }}
          priority
        />
      </div>
      <p className="text-muted-foreground font-medium animate-pulse">
        Loading your dashboard...
      </p>
    </div>
  );
}
