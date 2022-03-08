import { Workspace } from '@prisma/client';

export type UpdateWorkspaceVars = Pick<Workspace, 'id' | 'name'>;

export type DeleteWorkspaceVars = Pick<UpdateWorkspaceVars, 'id'>;

export interface DeleteWorkspaceMemberVars {
  workspaceId: string;
  workspaceMemberId: string;
}

export interface UpdateWorkspaceMemberVars extends DeleteWorkspaceMemberVars {
  roles: string[];
}
