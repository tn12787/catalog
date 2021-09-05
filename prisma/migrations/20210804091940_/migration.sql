/*
  Warnings:

  - The values [SINGLE,ALBUM] on the enum `ReleaseType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReleaseType_new" AS ENUM ('Single', 'EP', 'Album');
ALTER TABLE "Release" ALTER COLUMN "type" TYPE "ReleaseType_new" USING ("type"::text::"ReleaseType_new");
ALTER TYPE "ReleaseType" RENAME TO "ReleaseType_old";
ALTER TYPE "ReleaseType_new" RENAME TO "ReleaseType";
DROP TYPE "ReleaseType_old";
COMMIT;
