/*
  Warnings:

  - You are about to drop the `_ReleaseTaskToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReleaseTaskEvent" DROP CONSTRAINT "ReleaseTaskEvent_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ReleaseTaskToUser" DROP CONSTRAINT "_ReleaseTaskToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReleaseTaskToUser" DROP CONSTRAINT "_ReleaseTaskToUser_B_fkey";

-- DropTable
DROP TABLE "_ReleaseTaskToUser";

-- CreateTable
CREATE TABLE "_ReleaseTaskToTeamMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReleaseTaskToTeamMember_AB_unique" ON "_ReleaseTaskToTeamMember"("A", "B");

-- CreateIndex
CREATE INDEX "_ReleaseTaskToTeamMember_B_index" ON "_ReleaseTaskToTeamMember"("B");

-- AddForeignKey
ALTER TABLE "ReleaseTaskEvent" ADD CONSTRAINT "ReleaseTaskEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TeamMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReleaseTaskToTeamMember" ADD FOREIGN KEY ("A") REFERENCES "ReleaseTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReleaseTaskToTeamMember" ADD FOREIGN KEY ("B") REFERENCES "TeamMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
