-- CreateEnum
CREATE TYPE "ReleaseType" AS ENUM ('Single', 'EP', 'Album');

-- CreateEnum
CREATE TYPE "CloudProvider" AS ENUM ('GSUITE', 'OFFICE_365');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('OUTSTANDING', 'IN_PROGRESS', 'COMPLETE');

-- CreateEnum
CREATE TYPE "ReleaseTaskType" AS ENUM ('MASTERING', 'ARTWORK', 'DISTRIBUTION', 'MUSIC_VIDEO', 'MARKETING');

-- CreateEnum
CREATE TYPE "TeamPlan" AS ENUM ('Artist', 'Indie', 'Major');

-- CreateEnum
CREATE TYPE "TaskEventType" AS ENUM ('NEW_COMMENT', 'UPDATE_COMMENT', 'DELETE_COMMENT', 'UPDATE_ASSIGNEES', 'UPDATE_STATUS', 'UPDATE_DATE');

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plan" "TeamPlan" NOT NULL DEFAULT E'Artist',
    "provider" "CloudProvider" NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "releaseTaskId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "legalName" TEXT,
    "spotifyUrl" TEXT,
    "instagramUrl" TEXT,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Release" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "type" "ReleaseType" NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Release_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseTask" (
    "id" TEXT NOT NULL,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3),
    "status" "TaskStatus" NOT NULL,
    "type" "ReleaseTaskType" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "completedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ReleaseTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtworkData" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "ArtworkData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistributionData" (
    "id" TEXT NOT NULL,
    "distributorId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "DistributionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingData" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "MarketingData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicVideoData" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "MusicVideoData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasteringData" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "MasteringData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distributor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "siteUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Distributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "marketingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MarketingLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleToTeamMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ReleaseTaskToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_userId_teamId_key" ON "TeamMember"("userId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_email_key" ON "Invite"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_accessToken_key" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_teamId_key" ON "Artist"("name", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Release_name_artistId_teamId_key" ON "Release"("name", "artistId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "ReleaseTask_calendarEventId_key" ON "ReleaseTask"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "ReleaseTask_releaseId_type_key" ON "ReleaseTask"("releaseId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ArtworkData_url_key" ON "ArtworkData"("url");

-- CreateIndex
CREATE UNIQUE INDEX "ArtworkData_taskId_key" ON "ArtworkData"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "DistributionData_taskId_key" ON "DistributionData"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "MarketingData_taskId_key" ON "MarketingData"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "MusicVideoData_url_key" ON "MusicVideoData"("url");

-- CreateIndex
CREATE UNIQUE INDEX "MusicVideoData_taskId_key" ON "MusicVideoData"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "MasteringData_url_key" ON "MasteringData"("url");

-- CreateIndex
CREATE UNIQUE INDEX "MasteringData_taskId_key" ON "MasteringData"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_name_key" ON "Distributor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_siteUrl_key" ON "Distributor"("siteUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_name_siteUrl_key" ON "Distributor"("name", "siteUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToTeamMember_AB_unique" ON "_RoleToTeamMember"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToTeamMember_B_index" ON "_RoleToTeamMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReleaseTaskToUser_AB_unique" ON "_ReleaseTaskToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ReleaseTaskToUser_B_index" ON "_ReleaseTaskToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseTask" ADD CONSTRAINT "ReleaseTask_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseTask" ADD CONSTRAINT "ReleaseTask_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtworkData" ADD CONSTRAINT "ArtworkData_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "ReleaseTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributionData" ADD CONSTRAINT "DistributionData_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "Distributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributionData" ADD CONSTRAINT "DistributionData_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "ReleaseTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingData" ADD CONSTRAINT "MarketingData_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "ReleaseTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicVideoData" ADD CONSTRAINT "MusicVideoData_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "ReleaseTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasteringData" ADD CONSTRAINT "MasteringData_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "ReleaseTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingLink" ADD CONSTRAINT "MarketingLink_marketingId_fkey" FOREIGN KEY ("marketingId") REFERENCES "MarketingData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToTeamMember" ADD FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToTeamMember" ADD FOREIGN KEY ("B") REFERENCES "TeamMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReleaseTaskToUser" ADD FOREIGN KEY ("A") REFERENCES "ReleaseTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReleaseTaskToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
