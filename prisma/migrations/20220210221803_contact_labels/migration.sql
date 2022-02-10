/*
  Warnings:

  - You are about to drop the column `completedById` on the `ReleaseTask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReleaseTask" DROP CONSTRAINT "ReleaseTask_completedById_fkey";

-- AlterTable
ALTER TABLE "ReleaseTask" DROP COLUMN "completedById";

-- CreateTable
CREATE TABLE "ContactLabel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "ContactLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContactToReleaseTask" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ContactToContactLabel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactLabel_name_teamId_key" ON "ContactLabel"("name", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactToReleaseTask_AB_unique" ON "_ContactToReleaseTask"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactToReleaseTask_B_index" ON "_ContactToReleaseTask"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactToContactLabel_AB_unique" ON "_ContactToContactLabel"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactToContactLabel_B_index" ON "_ContactToContactLabel"("B");

-- AddForeignKey
ALTER TABLE "ContactLabel" ADD CONSTRAINT "ContactLabel_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToReleaseTask" ADD FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToReleaseTask" ADD FOREIGN KEY ("B") REFERENCES "ReleaseTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToContactLabel" ADD FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToContactLabel" ADD FOREIGN KEY ("B") REFERENCES "ContactLabel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
