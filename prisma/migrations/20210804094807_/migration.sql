/*
  Warnings:

  - A unique constraint covering the columns `[name,teamId]` on the table `Release` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artistId` to the `Release` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "legalName" TEXT;

-- AlterTable
ALTER TABLE "Release" ADD COLUMN     "artistId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Release.name_teamId_unique" ON "Release"("name", "teamId");

-- AddForeignKey
ALTER TABLE "Release" ADD FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
