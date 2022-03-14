/*
  Warnings:

  - A unique constraint covering the columns `[releaseId,name]` on the table `ReleaseTask` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ReleaseTask_releaseId_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "ReleaseTask_releaseId_name_key" ON "ReleaseTask"("releaseId", "name");
