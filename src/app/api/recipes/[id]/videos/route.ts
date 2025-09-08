import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Allow public access to recipe videos
    const { id } = await params;
    const recipeId = id;
    
    if (!recipeId || isNaN(Number(recipeId))) {
      return NextResponse.json(
        { error: "Valid recipe ID is required" },
        { status: 400 }
      );
    }

    // Get recipe information first to get the title for video search
    const apiKey = process.env.SPOONACULAR_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Spoonacular API key not configured" },
        { status: 500 }
      );
    }

    // Fetch recipe videos from Spoonacular
    const videosUrl = `https://api.spoonacular.com/recipes/${recipeId}/videos?apiKey=${apiKey}`;
    
    const response = await fetch(videosUrl);
    
    if (!response.ok) {
      console.error("Spoonacular videos API error:", response.status, response.statusText);
      
      // Return empty videos array instead of error for non-critical feature
      return NextResponse.json({ videos: [] });
    }

    const data = await response.json();
    
    return NextResponse.json({
      videos: data.videos || []
    });

  } catch (error) {
    console.error("Error fetching recipe videos:", error);
    // Return empty videos array instead of error for non-critical feature
    return NextResponse.json({ videos: [] });
  }
}
