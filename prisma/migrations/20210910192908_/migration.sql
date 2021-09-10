/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Distributor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siteUrl]` on the table `Distributor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,siteUrl]` on the table `Distributor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Distributor_name_key" ON "Distributor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_siteUrl_key" ON "Distributor"("siteUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_name_siteUrl_key" ON "Distributor"("name", "siteUrl");
