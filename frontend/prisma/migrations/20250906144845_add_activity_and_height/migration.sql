/*
  Warnings:

  - You are about to drop the column `dietType` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "dietType",
ADD COLUMN     "diet_preference" TEXT;
