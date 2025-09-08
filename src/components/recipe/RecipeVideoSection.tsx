"use client";

interface RecipeVideoSectionProps {
  videos?: Array<{
    title: string;
    youTubeId: string;
    rating: number;
    thumbnail: string;
  }>;
  sourceUrl?: string;
}

export function RecipeVideoSection({ videos }: RecipeVideoSectionProps) {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className="mb-6 text-3xl font-bold text-gray-900">
        Watch Recipe Video
      </h3>
      <div className="aspect-video overflow-hidden rounded-xl">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videos[0].youTubeId}`}
          title={videos[0].title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
