/*
  Warnings:

  - You are about to drop the `_RoleToTeamUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RoleToTeamUser" DROP CONSTRAINT "_RoleToTeamUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoleToTeamUser" DROP CONSTRAINT "_RoleToTeamUser_B_fkey";

-- DropForeignKey
ALTER TABLE "TeamUser" DROP CONSTRAINT "TeamUser_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamUser" DROP CONSTRAINT "TeamUser_userId_fkey";

-- DropTable
DROP TABLE "_RoleToTeamUser";

-- DropTable
DROP TABLE "TeamUser";

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleToTeamMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_userId_teamId_key" ON "TeamMember"("userId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToTeamMember_AB_unique" ON "_RoleToTeamMember"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToTeamMember_B_index" ON "_RoleToTeamMember"("B");

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToTeamMember" ADD FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToTeamMember" ADD FOREIGN KEY ("B") REFERENCES "TeamMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
