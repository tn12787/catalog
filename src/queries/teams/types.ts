import { Team } from '.prisma/client';

export type UpdateTeamVars = Pick<Team, 'id' | 'name'>;
