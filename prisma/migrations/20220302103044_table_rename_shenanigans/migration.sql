-- AlterTable
ALTER TABLE "Workspace" RENAME CONSTRAINT "Team_pkey" TO "Workspace_pkey";

-- AlterTable
ALTER TABLE "WorkspaceMember" RENAME CONSTRAINT "TeamMember_pkey" TO "WorkspaceMember_pkey";

-- RenameForeignKey
ALTER TABLE "WorkspaceMember" RENAME CONSTRAINT "TeamMember_userId_fkey" TO "WorkspaceMember_userId_fkey";

-- RenameForeignKey
ALTER TABLE "WorkspaceMember" RENAME CONSTRAINT "TeamMember_workspaceId_fkey" TO "WorkspaceMember_workspaceId_fkey";

-- RenameIndex
ALTER INDEX "Team_stripeCustomerId_key" RENAME TO "Workspace_stripeCustomerId_key";

-- RenameIndex
ALTER INDEX "Team_stripeSubscriptionId_key" RENAME TO "Workspace_stripeSubscriptionId_key";

-- RenameIndex
ALTER INDEX "TeamMember_userId_workspaceId_key" RENAME TO "WorkspaceMember_userId_workspaceId_key";
