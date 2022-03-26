/*
  Warnings:

  - The values [MONTHLY,ANNUALLY] on the enum `BillingInterval` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BillingInterval_new" AS ENUM ('monthly', 'yearly');
ALTER TABLE "Subscription" ALTER COLUMN "interval" DROP DEFAULT;
ALTER TABLE "Subscription" ALTER COLUMN "interval" TYPE "BillingInterval_new" USING ("interval"::text::"BillingInterval_new");
ALTER TYPE "BillingInterval" RENAME TO "BillingInterval_old";
ALTER TYPE "BillingInterval_new" RENAME TO "BillingInterval";
DROP TYPE "BillingInterval_old";
ALTER TABLE "Subscription" ALTER COLUMN "interval" SET DEFAULT 'monthly';
COMMIT;

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_workspaceId_fkey";

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "interval" SET DEFAULT E'monthly';

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
