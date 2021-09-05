/*
  Warnings:

  - You are about to drop the `ReleaseTask` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,artistId,teamId]` on the table `Release` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ReleaseTask" DROP CONSTRAINT "ReleaseTask_assignee_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseTask" DROP CONSTRAINT "ReleaseTask_completedBy_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseTask" DROP CONSTRAINT "ReleaseTask_releaseId_fkey";

-- DropIndex
DROP INDEX "Release.name_teamId_unique";

-- DropTable
DROP TABLE "ReleaseTask";

-- CreateTable
CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "assignee" TEXT,
    "completedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distribution" (
    "id" TEXT NOT NULL,
    "distributor" TEXT,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "assignee" TEXT,
    "completedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marketing" (
    "id" TEXT NOT NULL,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "assignee" TEXT,
    "completedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "marketingId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicVideo" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "assignee" TEXT,
    "completedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artwork.url_unique" ON "Artwork"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork.calendarEventId_unique" ON "Artwork"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork.releaseId_unique" ON "Artwork"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Distribution.distributor_unique" ON "Distribution"("distributor");

-- CreateIndex
CREATE UNIQUE INDEX "Distribution.calendarEventId_unique" ON "Distribution"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Distribution.releaseId_unique" ON "Distribution"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Marketing.calendarEventId_unique" ON "Marketing"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Marketing.releaseId_unique" ON "Marketing"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "MusicVideo.url_unique" ON "MusicVideo"("url");

-- CreateIndex
CREATE UNIQUE INDEX "MusicVideo.calendarEventId_unique" ON "MusicVideo"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "MusicVideo.releaseId_unique" ON "MusicVideo"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Release.name_artistId_teamId_unique" ON "Release"("name", "artistId", "teamId");

-- AddForeignKey
ALTER TABLE "Artwork" ADD FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD FOREIGN KEY ("assignee") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD FOREIGN KEY ("completedBy") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD FOREIGN KEY ("assignee") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD FOREIGN KEY ("completedBy") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing" ADD FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing" ADD FOREIGN KEY ("assignee") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing" ADD FOREIGN KEY ("completedBy") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingLink" ADD FOREIGN KEY ("marketingId") REFERENCES "Marketing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicVideo" ADD FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicVideo" ADD FOREIGN KEY ("assignee") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicVideo" ADD FOREIGN KEY ("completedBy") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
