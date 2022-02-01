/*
  Warnings:

  - The values [TASKS_OVERDUE] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `taskId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('TASK_DUE_IN_48_HOURS', 'TASK_DUE_TODAY', 'TASK_OVERDUE');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "NotificationType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "taskId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "ReleaseTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;
