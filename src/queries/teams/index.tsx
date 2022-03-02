import axios from 'axios';

import { DeleteTeamMemberVars, UpdateTeamMemberVars, UpdateTeamVars } from './types';

import { EnrichedWorkspace } from 'types/common';

export const fetchTeam = async (id: string) => {
  const { data: response } = await axios.get<EnrichedWorkspace>(`/api/teams/${id}`);

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
  workspaceId,
  workspaceMemberId,
  roles,
}: UpdateTeamMemberVars) => {
  const { data: response } = await axios.patch(
    `/api/teams/${workspaceId}/members/${workspaceMemberId}`,
    {
      roles,
    }
  );
  return response;
};

export const deleteTeamMember = async ({
  workspaceId,
  workspaceMemberId,
}: DeleteTeamMemberVars) => {
  const { data: response } = await axios.delete(
    `/api/teams/${workspaceId}/members/${workspaceMemberId}`
  );
  return response;
};
