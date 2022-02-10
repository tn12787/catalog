/*
  Warnings:

  - Made the column `stripeCustomerId` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "stripeCustomerId" SET NOT NULL;
