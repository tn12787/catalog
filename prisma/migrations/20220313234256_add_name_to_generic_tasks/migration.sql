/*
  Warnings:

  - Made the column `dueDate` on table `ReleaseTask` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ReleaseTask" ADD COLUMN     "name" TEXT,
ALTER COLUMN "dueDate" SET NOT NULL,
ALTER COLUMN "dueDate" SET DEFAULT CURRENT_TIMESTAMP;
