/*
  Warnings:

  - The values [MUSIC_VIDEO,MARKETING] on the enum `ReleaseTaskType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `MarketingData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MarketingLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MusicVideoData` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReleaseTaskType_new" AS ENUM ('MASTERING', 'ARTWORK', 'DISTRIBUTION', 'GENERIC');
ALTER TABLE "ReleaseTask" ALTER COLUMN "type" TYPE "ReleaseTaskType_new" USING ("type"::text::"ReleaseTaskType_new");
ALTER TYPE "ReleaseTaskType" RENAME TO "ReleaseTaskType_old";
ALTER TYPE "ReleaseTaskType_new" RENAME TO "ReleaseTaskType";
DROP TYPE "ReleaseTaskType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "MarketingData" DROP CONSTRAINT "MarketingData_taskId_fkey";

-- DropForeignKey
ALTER TABLE "MarketingLink" DROP CONSTRAINT "MarketingLink_marketingId_fkey";

-- DropForeignKey
ALTER TABLE "MusicVideoData" DROP CONSTRAINT "MusicVideoData_taskId_fkey";

-- DropTable
DROP TABLE "MarketingData";

-- DropTable
DROP TABLE "MarketingLink";

-- DropTable
DROP TABLE "MusicVideoData";
