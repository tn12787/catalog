import { Team } from '@prisma/client';

export type UpdateTeamVars = Pick<Team, 'id' | 'name'>;

export interface DeleteTeamMemberVars {
  workspaceId: string;
  workspaceMemberId: string;
}

export interface UpdateTeamMemberVars extends DeleteTeamMemberVars {
  roles: string[];
}
