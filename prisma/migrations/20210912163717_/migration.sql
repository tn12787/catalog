-- CreateEnum
CREATE TYPE "ReleaseType" AS ENUM ('Single', 'EP', 'Album');

-- CreateEnum
CREATE TYPE "CloudProvider" AS ENUM ('GSUITE', 'OFFICE_365');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('OUTSTANDING', 'IN_PROGRESS', 'COMPLETE');

-- CreateEnum
CREATE TYPE "ReleaseTaskType" AS ENUM ('MASTERING', 'ARTWORK', 'DISTRIBUTION', 'MUSIC_VIDEO');

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" "CloudProvider" NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TeamUser_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "completedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distribution" (
    "id" TEXT NOT NULL,
    "distributorId" TEXT NOT NULL,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "completedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Distribution_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Marketing" (
    "id" TEXT NOT NULL,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "completedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Marketing_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "MusicVideo" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "completedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MusicVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mastering" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "notes" TEXT,
    "calendarEventId" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "releaseId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "completedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Mastering_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "_RoleToTeamUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamUser_userId_teamId_key" ON "TeamUser"("userId", "teamId");

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
CREATE UNIQUE INDEX "Artwork_url_key" ON "Artwork"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_calendarEventId_key" ON "Artwork"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_releaseId_key" ON "Artwork"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Distribution_calendarEventId_key" ON "Distribution"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Distribution_releaseId_key" ON "Distribution"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_name_key" ON "Distributor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_siteUrl_key" ON "Distributor"("siteUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_name_siteUrl_key" ON "Distributor"("name", "siteUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Marketing_calendarEventId_key" ON "Marketing"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Marketing_releaseId_key" ON "Marketing"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "MusicVideo_url_key" ON "MusicVideo"("url");

-- CreateIndex
CREATE UNIQUE INDEX "MusicVideo_calendarEventId_key" ON "MusicVideo"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "MusicVideo_releaseId_key" ON "MusicVideo"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Mastering_url_key" ON "Mastering"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Mastering_calendarEventId_key" ON "Mastering"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Mastering_releaseId_key" ON "Mastering"("releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToTeamUser_AB_unique" ON "_RoleToTeamUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToTeamUser_B_index" ON "_RoleToTeamUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- AddForeignKey
ALTER TABLE "TeamUser" ADD CONSTRAINT "TeamUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamUser" ADD CONSTRAINT "TeamUser_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD CONSTRAINT "Distribution_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "Distributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD CONSTRAINT "Distribution_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD CONSTRAINT "Distribution_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distribution" ADD CONSTRAINT "Distribution_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing" ADD CONSTRAINT "Marketing_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing" ADD CONSTRAINT "Marketing_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing" ADD CONSTRAINT "Marketing_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingLink" ADD CONSTRAINT "MarketingLink_marketingId_fkey" FOREIGN KEY ("marketingId") REFERENCES "Marketing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicVideo" ADD CONSTRAINT "MusicVideo_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicVideo" ADD CONSTRAINT "MusicVideo_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicVideo" ADD CONSTRAINT "MusicVideo_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mastering" ADD CONSTRAINT "Mastering_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mastering" ADD CONSTRAINT "Mastering_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mastering" ADD CONSTRAINT "Mastering_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToTeamUser" ADD FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToTeamUser" ADD FOREIGN KEY ("B") REFERENCES "TeamUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
