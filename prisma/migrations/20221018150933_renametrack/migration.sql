/*
  Warnings:

  - You are about to drop the `ReleaseTrack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ReleaseToReleaseTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ReleaseToReleaseTrack" DROP CONSTRAINT "_ReleaseToReleaseTrack_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReleaseToReleaseTrack" DROP CONSTRAINT "_ReleaseToReleaseTrack_B_fkey";

-- DropForeignKey
ALTER TABLE "_featuringArtists" DROP CONSTRAINT "_featuringArtists_B_fkey";

-- DropForeignKey
ALTER TABLE "_mainArtists" DROP CONSTRAINT "_mainArtists_B_fkey";

-- DropTable
DROP TABLE "ReleaseTrack";

-- DropTable
DROP TABLE "_ReleaseToReleaseTrack";

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lyrics" TEXT,
    "workspaceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReleaseToTrack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReleaseToTrack_AB_unique" ON "_ReleaseToTrack"("A", "B");

-- CreateIndex
CREATE INDEX "_ReleaseToTrack_B_index" ON "_ReleaseToTrack"("B");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mainArtists" ADD CONSTRAINT "_mainArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_featuringArtists" ADD CONSTRAINT "_featuringArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReleaseToTrack" ADD CONSTRAINT "_ReleaseToTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReleaseToTrack" ADD CONSTRAINT "_ReleaseToTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
