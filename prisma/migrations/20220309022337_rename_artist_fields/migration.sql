-- AlterTable
ALTER TABLE "Artist"
  RENAME "instagramUrl" to "instagramUsername";
ALTER TABLE "Artist"
  RENAME "spotifyUrl" to "spotifyId";
ALTER TABLE "Artist"
ADD COLUMN "imageUrl" TEXT,
  ADD COLUMN "linkTreeUrl" TEXT;