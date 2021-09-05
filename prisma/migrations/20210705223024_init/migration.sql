-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VIEW', 'EDIT', 'ADMIN');

-- CreateEnum
CREATE TYPE "ReleaseType" AS ENUM ('SINGLE', 'EP', 'ALBUM');

-- CreateEnum
CREATE TYPE "CloudProvider" AS ENUM ('GSUITE', 'OFFICE_365');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('OUTSTANDING', 'IN_PROGRESS', 'COMPLETE');

-- CreateEnum
CREATE TYPE "ReleaseTaskType" AS ENUM ('MASTERING', 'ARTWORK', 'DISTRIBUTION', 'MUSIC_VIDEO');

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" "CloudProvider" NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'VIEW',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "spotifyUrl" TEXT,
    "instagramUrl" TEXT,
    "managedBy" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Release" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ReleaseType" NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "teamId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "teamId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseTask" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "type" "ReleaseTaskType" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "assignee" TEXT,
    "completedBy" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ReleaseTask.url_unique" ON "ReleaseTask"("url");

-- CreateIndex
CREATE UNIQUE INDEX "ReleaseTask.calendarEventId_unique" ON "ReleaseTask"("calendarEventId");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD FOREIGN KEY ("managedBy") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseTask" ADD FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseTask" ADD FOREIGN KEY ("assignee") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseTask" ADD FOREIGN KEY ("completedBy") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
