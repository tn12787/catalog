-- CreateEnum
CREATE TYPE "TeamPlan" AS ENUM ('Artist', 'Indie', 'Major');

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "plan" "TeamPlan" NOT NULL DEFAULT E'Artist';
