/*
  Warnings:

  - You are about to drop the column `payload` on the `ReleaseTaskEvent` table. All the data in the column will be lost.
  - Added the required column `extraData` to the `ReleaseTaskEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReleaseTaskEvent" DROP COLUMN "payload",
ADD COLUMN     "extraData" JSONB NOT NULL;
