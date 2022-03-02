import { User, WorkspaceMember, Invite } from '@prisma/client';
import axios from 'axios';

export const sendUserInvitation = async ({
  id,
  email,
  role,
}: Pick<User, 'email'> & { id: string; role: string }): Promise<void> => {
  if (!id) return Promise.reject();

  const { data: response } = await axios.post(`/api/workspaces/${id}/invitations`, { email, role });
  return response;
};

export const acceptInvite = async (id: string): Promise<WorkspaceMember> => {
  if (!id) return Promise.reject();

  const { data: response } = await axios.post(`/api/invitations/${id}/accept`, {});
  return response;
};

export const rescindInvitation = async (id: string): Promise<Invite> => {
  if (!id) return Promise.reject();

  const { data: response } = await axios.delete(`/api/invitations/${id}`, {});
  return response;
};
