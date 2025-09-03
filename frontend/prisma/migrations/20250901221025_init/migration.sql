-- CreateTable
CREATE TABLE "public"."RecipeEmbedding" (
    "id" TEXT NOT NULL,
    "embedding" DOUBLE PRECISION[],
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "RecipeEmbedding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."RecipeEmbedding" ADD CONSTRAINT "RecipeEmbedding_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
