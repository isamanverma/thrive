-- AlterTable
ALTER TABLE "User" ADD COLUMN "activityLevel" TEXT;
ALTER TABLE "User" ADD COLUMN "dietType" TEXT;
ALTER TABLE "User" ADD COLUMN "height" DOUBLE PRECISION;

-- Migrate existing allergies data to dietType
UPDATE "User" 
SET "dietType" = CASE 
    WHEN 'Vegetarian' = ANY("allergies") THEN 'Vegetarian'
    WHEN 'Vegan' = ANY("allergies") THEN 'Vegan'
    ELSE 'Non-Vegetarian'
END
WHERE "allergies" IS NOT NULL;

-- Set default for users with NULL allergies
UPDATE "User" 
SET "dietType" = 'Non-Vegetarian'
WHERE "dietType" IS NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "allergies";
