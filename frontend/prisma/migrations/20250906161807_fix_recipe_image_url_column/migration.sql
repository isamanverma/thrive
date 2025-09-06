/*
  Warnings:

  - You are about to drop the column `cuisine` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `img_url` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `mealType` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `nutrition` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Recipe" DROP COLUMN "cuisine",
DROP COLUMN "img_url",
DROP COLUMN "link",
DROP COLUMN "mealType",
DROP COLUMN "nutrition",
DROP COLUMN "source",
ADD COLUMN     "image_url" TEXT;
