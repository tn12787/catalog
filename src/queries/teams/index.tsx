import axios from 'axios';

import { DeleteTeamMemberVars, UpdateTeamMemberVars, UpdateTeamVars } from './types';

import { EnrichedTeam } from 'types/common';

export const fetchTeam = async (id: string) => {
  const { data: response } = await axios.get<EnrichedTeam>(`/api/teams/${id}`);

  return response;
};

export const updateSingleTeam = async ({ id, ...data }: UpdateTeamVars) => {
  if (!id) throw new Error('No team id');

  const { data: response } = await axios.put(`/api/teams/${id}`, {
    ...data,
  });

  return response;
};

export const updateTeamMemberRoles = async ({
  teamId,
  teamMemberId,
  roles,
}: UpdateTeamMemberVars) => {
  const { data: response } = await axios.patch(`/api/teams/${teamId}/members/${teamMemberId}`, {
    roles,
  });
  return response;
};

export const deleteTeamMember = async ({ teamId, teamMemberId }: DeleteTeamMemberVars) => {
  const { data: response } = await axios.delete(`/api/teams/${teamId}/members/${teamMemberId}`);
  return response;
};
