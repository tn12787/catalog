ALTER TABLE "Artist"
  RENAME COLUMN "teamId" to "workspaceId";
ALTER TABLE "Contact"
  RENAME COLUMN "teamId" to "workspaceId";
ALTER TABLE "ContactLabel"
  RENAME COLUMN "teamId" to "workspaceId";
ALTER TABLE "Invite"
  RENAME COLUMN "teamId" to "workspaceId";
ALTER TABLE "Notification"
  RENAME COLUMN "teamMemberId" to "workspaceMemberId";
ALTER TABLE "Release"
  RENAME COLUMN "teamId" to "workspaceId";
ALTER TABLE "TeamMember"
  RENAME COLUMN "teamId" to "workspaceId";