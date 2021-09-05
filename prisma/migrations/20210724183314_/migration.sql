/*
  Warnings:

  - A unique constraint covering the columns `[type,releaseId]` on the table `ReleaseTask` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReleaseTask.type_releaseId_unique" ON "ReleaseTask"("type", "releaseId");
