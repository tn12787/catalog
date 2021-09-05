-- CreateTable
CREATE TABLE "Mastering" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "assignee" TEXT,
    "completedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mastering.url_unique" ON "Mastering"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Mastering.calendarEventId_unique" ON "Mastering"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Mastering.releaseId_unique" ON "Mastering"("releaseId");

-- AddForeignKey
ALTER TABLE "Mastering" ADD FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mastering" ADD FOREIGN KEY ("assignee") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mastering" ADD FOREIGN KEY ("completedBy") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
