/*
  Warnings:

  - You are about to drop the column `plan` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "plan",
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT;

-- DropEnum
DROP TYPE "TeamPlan";
