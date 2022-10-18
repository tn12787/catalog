-- CreateTable
CREATE TABLE "ReleaseTrack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lyrics" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ReleaseTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_mainArtists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_featuringArtists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ReleaseToReleaseTrack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_mainArtists_AB_unique" ON "_mainArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_mainArtists_B_index" ON "_mainArtists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_featuringArtists_AB_unique" ON "_featuringArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_featuringArtists_B_index" ON "_featuringArtists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReleaseToReleaseTrack_AB_unique" ON "_ReleaseToReleaseTrack"("A", "B");

-- CreateIndex
CREATE INDEX "_ReleaseToReleaseTrack_B_index" ON "_ReleaseToReleaseTrack"("B");

-- AddForeignKey
ALTER TABLE "_mainArtists" ADD CONSTRAINT "_mainArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mainArtists" ADD CONSTRAINT "_mainArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "ReleaseTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_featuringArtists" ADD CONSTRAINT "_featuringArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_featuringArtists" ADD CONSTRAINT "_featuringArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "ReleaseTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReleaseToReleaseTrack" ADD CONSTRAINT "_ReleaseToReleaseTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReleaseToReleaseTrack" ADD CONSTRAINT "_ReleaseToReleaseTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "ReleaseTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
