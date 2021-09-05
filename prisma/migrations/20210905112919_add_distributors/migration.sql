/*
  Warnings:

  - You are about to drop the column `distributor` on the `Distribution` table. All the data in the column will be lost.
  - Added the required column `distributorId` to the `Distribution` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Distribution.distributor_unique";

-- AlterTable
ALTER TABLE "Distribution" DROP COLUMN "distributor",
ADD COLUMN     "distributorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Distributor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "siteUrl" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Distribution" ADD FOREIGN KEY ("distributorId") REFERENCES "Distributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
