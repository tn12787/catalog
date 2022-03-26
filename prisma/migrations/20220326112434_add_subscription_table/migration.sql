/*
  Warnings:

  - You are about to drop the column `stripeSubscriptionId` on the `Workspace` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BillingInterval" AS ENUM ('MONTHLY', 'ANNUALLY');

-- DropIndex
DROP INDEX "Workspace_stripeSubscriptionId_key";

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "stripeSubscriptionId";

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "trialEnd" TIMESTAMP(3),
    "totalSeats" INTEGER NOT NULL DEFAULT 1,
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelTime" TIMESTAMP(3),
    "interval" "BillingInterval" NOT NULL DEFAULT E'MONTHLY',
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_workspaceId_key" ON "Subscription"("workspaceId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
