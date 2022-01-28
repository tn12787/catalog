import { Team } from '@prisma/client';

export type UpdateTeamVars = Pick<Team, 'id' | 'name'>;

export interface DeleteTeamMemberVars {
  teamId: string;
  teamMemberId: string;
}

export interface UpdateTeamMemberVars extends DeleteTeamMemberVars {
  roles: string[];
}
