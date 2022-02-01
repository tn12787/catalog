/*
  Warnings:

  - A unique constraint covering the columns `[teamMemberId,taskId,type]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Notification_teamMemberId_taskId_type_key" ON "Notification"("teamMemberId", "taskId", "type");
