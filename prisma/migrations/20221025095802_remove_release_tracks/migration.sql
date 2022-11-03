/*
  Warnings:

  - You are about to drop the `ReleaseTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReleaseTrack" DROP CONSTRAINT "ReleaseTrack_releaseId_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseTrack" DROP CONSTRAINT "ReleaseTrack_trackId_fkey";

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "releaseId" TEXT;

-- DropTable
DROP TABLE "ReleaseTrack";

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;
