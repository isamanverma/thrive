/*
  Warnings:

  - You are about to drop the column `recipeId` on the `RecipeEmbedding` table. All the data in the column will be lost.
  - Added the required column `recipe_id` to the `RecipeEmbedding` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."RecipeEmbedding" DROP CONSTRAINT "RecipeEmbedding_recipeId_fkey";

-- AlterTable
ALTER TABLE "public"."RecipeEmbedding" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."RecipeEmbedding" ADD CONSTRAINT "RecipeEmbedding_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
