import axios from 'axios';
import { Team } from '@prisma/client';

import { UpdateTeamVars } from './types';

import { TeamMemberWithUserAndRoles } from 'types/common';

export const fetchTeam = async (id: string) => {
  const { data: response } = await axios.get<Team & { members: TeamMemberWithUserAndRoles[] }>(
    `/api/teams/${id}`
  );

  return response;
};

export const updateSingleTeam = async ({ id, ...data }: UpdateTeamVars) => {
  if (!id) throw new Error('No team id');

  const { data: response } = await axios.put(`/api/teams/${id}`, {
    ...data,
  });

  return response;
};
