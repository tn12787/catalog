/*
  Warnings:

  - A unique constraint covering the columns `[name,teamId]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_teamId_key" ON "Artist"("name", "teamId");
