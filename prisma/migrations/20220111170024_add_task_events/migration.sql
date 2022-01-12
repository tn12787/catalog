/*
  Warnings:

  - You are about to drop the column `releaseTaskId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "releaseTaskId";

-- CreateTable
CREATE TABLE "ReleaseTaskEvent" (
    "id" TEXT NOT NULL,
    "type" "TaskEventType" NOT NULL,
    "taskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReleaseTaskEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReleaseTaskEvent" ADD CONSTRAINT "ReleaseTaskEvent_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "ReleaseTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseTaskEvent" ADD CONSTRAINT "ReleaseTaskEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
