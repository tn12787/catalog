-- DropIndex
DROP INDEX "Notification_workspaceMemberId_taskId_type_key";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "actorId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "WorkspaceMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
