-- RenameIndex
ALTER INDEX "_ReleaseTaskToTeamMember_AB_unique" RENAME TO "_ReleaseTaskToWorkspaceMember_AB_unique";

-- RenameIndex
ALTER INDEX "_ReleaseTaskToTeamMember_B_index" RENAME TO "_ReleaseTaskToWorkspaceMember_B_index";

-- RenameIndex
ALTER INDEX "_RoleToTeamMember_AB_unique" RENAME TO "_RoleToWorkspaceMember_AB_unique";

-- RenameIndex
ALTER INDEX "_RoleToTeamMember_B_index" RENAME TO "_RoleToWorkspaceMember_B_index";
