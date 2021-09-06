/*
  Warnings:

  - You are about to drop the column `managedBy` on the `Artist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_managedBy_fkey";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "managedBy",
ADD COLUMN     "teamId" TEXT;

-- AddForeignKey
ALTER TABLE "Artist" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
