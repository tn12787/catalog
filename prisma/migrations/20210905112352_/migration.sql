/*
  Warnings:

  - You are about to drop the column `assignee` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `completedBy` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `assignee` on the `Distribution` table. All the data in the column will be lost.
  - You are about to drop the column `completedBy` on the `Distribution` table. All the data in the column will be lost.
  - You are about to drop the column `assignee` on the `Marketing` table. All the data in the column will be lost.
  - You are about to drop the column `completedBy` on the `Marketing` table. All the data in the column will be lost.
  - You are about to drop the column `assignee` on the `Mastering` table. All the data in the column will be lost.
  - You are about to drop the column `completedBy` on the `Mastering` table. All the data in the column will be lost.
  - You are about to drop the column `assignee` on the `MusicVideo` table. All the data in the column will be lost.
  - You are about to drop the column `completedBy` on the `MusicVideo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Artwork" DROP CONSTRAINT "Artwork_assignee_fkey";

-- DropForeignKey
ALTER TABLE "Artwork" DROP CONSTRAINT "Artwork_completedBy_fkey";

-- DropForeignKey
ALTER TABLE "Distribution" DROP CONSTRAINT "Distribution_assignee_fkey";

-- DropForeignKey
ALTER TABLE "Distribution" DROP CONSTRAINT "Distribution_completedBy_fkey";

-- DropForeignKey
ALTER TABLE "Marketing" DROP CONSTRAINT "Marketing_assignee_fkey";

-- DropForeignKey
ALTER TABLE "Marketing" DROP CONSTRAINT "Marketing_completedBy_fkey";

-- DropForeignKey
ALTER TABLE "Mastering" DROP CONSTRAINT "Mastering_assignee_fkey";

-- DropForeignKey
ALTER TABLE "Mastering" DROP CONSTRAINT "Mastering_completedBy_fkey";

-- DropForeignKey
ALTER TABLE "MusicVideo" DROP CONSTRAINT "MusicVideo_assignee_fkey";

-- DropForeignKey
ALTER TABLE "MusicVideo" DROP CONSTRAINT "MusicVideo_completedBy_fkey";

-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "assignee",
DROP COLUMN "completedBy",
ADD COLUMN     "assigneeId" TEXT,
ADD COLUMN     "completedById" TEXT;

-- AlterTable
ALTER TABLE "Distribution" DROP COLUMN "assignee",
DROP COLUMN "completedBy",
ADD COLUMN     "assigneeId" TEXT,
ADD COLUMN     "completedById" TEXT;

-- AlterTable
ALTER TABLE "Marketing" DROP COLUMN "assignee",
DROP COLUMN "completedBy",
ADD COLUMN     "assigneeId" TEXT,
ADD COLUMN     "completedById" TEXT;

-- AlterTable
ALTER TABLE "Mastering" DROP COLUMN "assignee",
DROP COLUMN "completedBy",
ADD COLUMN     "assigneeId" TEXT,
ADD COLUMN     "completedById" TEXT;

-- AlterTable
ALTER TABLE "MusicVideo" DROP COLUMN "assignee",
DROP COLUMN "completedBy",
ADD COLUMN     "assigneeId" TEXT,
ADD COLUMN     "completedById" TEXT;

-- AddForeignKey
ALTER TABLE "Artwork" ADD FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD FOREIGN KEY ("completedById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD FOREIGN KEY ("completedById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing" ADD FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing" ADD FOREIGN KEY ("completedById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicVideo" ADD FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicVideo" ADD FOREIGN KEY ("completedById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mastering" ADD FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mastering" ADD FOREIGN KEY ("completedById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
