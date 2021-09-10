/*
 Warnings:
 
 - You are about to drop the column `providerId` on the `Account` table. All the data in the column will be lost.
 - A unique constraint covering the columns `[provider,providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
 - Added the required column `provider` to the `Account` table without a default value. This is not possible if the table is not empty.
 
 */
-- DropIndex
DROP INDEX "Account.providerId_providerAccountId_unique";
-- AlterTable
ALTER TABLE "Account"
  RENAME COLUMN "providerId" TO "provider";
-- CreateIndex
CREATE UNIQUE INDEX "Account.provider_providerAccountId_unique" ON "Account"("provider", "providerAccountId");