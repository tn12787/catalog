-- CreateEnum
CREATE TYPE "TaskEventType" AS ENUM ('NEW_COMMENT', 'UPDATE_COMMENT', 'DELETE_COMMENT', 'UPDATE_ASSIGNEES', 'UPDATE_STATUS', 'UPDATE_DATE');

-- CreateTable
CREATE TABLE "ArtworkEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "artworkId" TEXT NOT NULL,

    CONSTRAINT "ArtworkEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArtworkEvent" ADD CONSTRAINT "ArtworkEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtworkEvent" ADD CONSTRAINT "ArtworkEvent_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
