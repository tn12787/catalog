-- AlterTable
ALTER TABLE "Artwork" ALTER COLUMN "dueDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Distribution" ALTER COLUMN "dueDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Marketing" ALTER COLUMN "dueDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Mastering" ALTER COLUMN "dueDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MusicVideo" ALTER COLUMN "dueDate" DROP NOT NULL;
