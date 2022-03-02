-- RenameForeignKey
ALTER TABLE "Artist" RENAME CONSTRAINT "Artist_teamId_fkey" TO "Artist_workspaceId_fkey";

-- RenameForeignKey
ALTER TABLE "Contact" RENAME CONSTRAINT "Contact_teamId_fkey" TO "Contact_workspaceId_fkey";

-- RenameForeignKey
ALTER TABLE "ContactLabel" RENAME CONSTRAINT "ContactLabel_teamId_fkey" TO "ContactLabel_workspaceId_fkey";

-- RenameForeignKey
ALTER TABLE "Invite" RENAME CONSTRAINT "Invite_teamId_fkey" TO "Invite_workspaceId_fkey";

-- RenameForeignKey
ALTER TABLE "Notification" RENAME CONSTRAINT "Notification_teamMemberId_fkey" TO "Notification_workspaceMemberId_fkey";

-- RenameForeignKey
ALTER TABLE "Release" RENAME CONSTRAINT "Release_teamId_fkey" TO "Release_workspaceId_fkey";

-- RenameForeignKey
ALTER TABLE "TeamMember" RENAME CONSTRAINT "TeamMember_teamId_fkey" TO "TeamMember_workspaceId_fkey";

-- RenameIndex
ALTER INDEX "Artist_name_teamId_key" RENAME TO "Artist_name_workspaceId_key";

-- RenameIndex
ALTER INDEX "Contact_name_teamId_key" RENAME TO "Contact_name_workspaceId_key";

-- RenameIndex
ALTER INDEX "ContactLabel_name_teamId_key" RENAME TO "ContactLabel_name_workspaceId_key";

-- RenameIndex
ALTER INDEX "Invite_email_teamId_key" RENAME TO "Invite_email_workspaceId_key";

-- RenameIndex
ALTER INDEX "Notification_teamMemberId_taskId_type_key" RENAME TO "Notification_workspaceMemberId_taskId_type_key";

-- RenameIndex
ALTER INDEX "Release_name_artistId_teamId_key" RENAME TO "Release_name_artistId_workspaceId_key";

-- RenameIndex
ALTER INDEX "TeamMember_userId_teamId_key" RENAME TO "TeamMember_userId_workspaceId_key";
