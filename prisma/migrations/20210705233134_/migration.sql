-- AlterTable
ALTER TABLE "User" ALTER COLUMN "emailVerified" DROP NOT NULL,
ALTER COLUMN "emailVerified" SET DEFAULT false;
