/*
  Warnings:

  - You are about to drop the column `role` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,teamId]` on the table `TeamUser` will be added. If there are existing duplicate values, this will fail.
  - Made the column `emailVerified` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "emailVerified" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TeamUser.userId_teamId_unique" ON "TeamUser"("userId", "teamId");
