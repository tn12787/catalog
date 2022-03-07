/*
  Warnings:

  - The values [UPDATE_STATUS,UPDATE_DATE] on the enum `UserOnboardingSegment` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserOnboardingSegment_new" AS ENUM ('INDIVIDUAL_ARTIST', 'ARTIST_MANAGER', 'LABEL_MANAGER', 'LABEL_EMPLOYEE', 'MARKETING_COORDINATOR', 'PUBLICIST', 'SOCIAL_MEDIA_MANAGER');
ALTER TABLE "User" ALTER COLUMN "segment" TYPE "UserOnboardingSegment_new" USING ("segment"::text::"UserOnboardingSegment_new");
ALTER TYPE "UserOnboardingSegment" RENAME TO "UserOnboardingSegment_old";
ALTER TYPE "UserOnboardingSegment_new" RENAME TO "UserOnboardingSegment";
DROP TYPE "UserOnboardingSegment_old";
COMMIT;
