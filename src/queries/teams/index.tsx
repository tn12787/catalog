import axios from 'axios';
import { Team } from '@prisma/client';

import { UpdateTeamVars } from './types';

import { TeamMemberWithUser } from 'components/teams/TeamMembersTable/types';

export const fetchTeam = async (id: string) => {
  if (!id) return; //TODO: deal with this hack

  const { data: response } = await axios.get<Team & { members: TeamMemberWithUser[] }>(
    `/api/teams/${id}`
  );

  return response;
};

export const updateSingleTeam = async ({ id, ...data }: UpdateTeamVars) => {
  if (!id) return; //TODO: deal with this hack

  const { data: response } = await axios.put(`/api/teams/${id}`, {
    ...data,
  });

  return response;
};
