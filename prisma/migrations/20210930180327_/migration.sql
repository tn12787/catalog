/*
  Warnings:

  - You are about to drop the column `assigneeId` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `assigneeId` on the `Distribution` table. All the data in the column will be lost.
  - You are about to drop the column `assigneeId` on the `Marketing` table. All the data in the column will be lost.
  - You are about to drop the column `assigneeId` on the `Mastering` table. All the data in the column will be lost.
  - You are about to drop the column `assigneeId` on the `MusicVideo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Artwork" DROP CONSTRAINT "Artwork_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "Distribution" DROP CONSTRAINT "Distribution_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "Marketing" DROP CONSTRAINT "Marketing_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "Mastering" DROP CONSTRAINT "Mastering_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "MusicVideo" DROP CONSTRAINT "MusicVideo_assigneeId_fkey";

-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "assigneeId";

-- AlterTable
ALTER TABLE "Distribution" DROP COLUMN "assigneeId";

-- AlterTable
ALTER TABLE "Marketing" DROP COLUMN "assigneeId";

-- AlterTable
ALTER TABLE "Mastering" DROP COLUMN "assigneeId";

-- AlterTable
ALTER TABLE "MusicVideo" DROP COLUMN "assigneeId";

-- CreateTable
CREATE TABLE "_ArtworkToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DistributionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MarketingToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicVideoToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MasteringToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtworkToUser_AB_unique" ON "_ArtworkToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtworkToUser_B_index" ON "_ArtworkToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DistributionToUser_AB_unique" ON "_DistributionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DistributionToUser_B_index" ON "_DistributionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MarketingToUser_AB_unique" ON "_MarketingToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MarketingToUser_B_index" ON "_MarketingToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicVideoToUser_AB_unique" ON "_MusicVideoToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicVideoToUser_B_index" ON "_MusicVideoToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MasteringToUser_AB_unique" ON "_MasteringToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MasteringToUser_B_index" ON "_MasteringToUser"("B");

-- AddForeignKey
ALTER TABLE "_ArtworkToUser" ADD FOREIGN KEY ("A") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtworkToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DistributionToUser" ADD FOREIGN KEY ("A") REFERENCES "Distribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DistributionToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MarketingToUser" ADD FOREIGN KEY ("A") REFERENCES "Marketing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MarketingToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicVideoToUser" ADD FOREIGN KEY ("A") REFERENCES "MusicVideo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicVideoToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasteringToUser" ADD FOREIGN KEY ("A") REFERENCES "Mastering"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasteringToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
