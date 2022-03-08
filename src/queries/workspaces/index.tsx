import axios from 'axios';

import {
  DeleteWorkspaceMemberVars,
  DeleteWorkspaceVars,
  UpdateWorkspaceMemberVars,
  UpdateWorkspaceVars,
} from './types';

import { EnrichedWorkspace } from 'types/common';

export const fetchWorkspace = async (id: string) => {
  const { data: response } = await axios.get<EnrichedWorkspace>(`/api/workspaces/${id}`);

  return response;
};

export const updateSingleWorkspace = async ({ id, ...data }: UpdateWorkspaceVars) => {
  if (!id) throw new Error('No workspace id provided to update');

  const { data: response } = await axios.put(`/api/workspaces/${id}`, {
    ...data,
  });

  return response;
};

export const deleteSingleWorkspace = async ({ id }: DeleteWorkspaceVars) => {
  const { data: response } = await axios.delete(`/api/workspaces/${id}`);
  return response;
};

export const updateWorkspaceMemberRoles = async ({
  workspaceId,
  workspaceMemberId,
  roles,
}: UpdateWorkspaceMemberVars) => {
  const { data: response } = await axios.patch(
    `/api/workspaces/${workspaceId}/members/${workspaceMemberId}`,
    {
      roles,
    }
  );
  return response;
};

export const deleteWorkspaceMember = async ({
  workspaceId,
  workspaceMemberId,
}: DeleteWorkspaceMemberVars) => {
  const { data: response } = await axios.delete(
    `/api/workspaces/${workspaceId}/members/${workspaceMemberId}`
  );
  return response;
};
