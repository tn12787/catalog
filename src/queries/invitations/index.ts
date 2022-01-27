import { User } from '@prisma/client';
import axios from 'axios';

export const sendUserInvitation = async ({ id, email }: Partial<User>): Promise<void> => {
  if (!id) return Promise.reject();

  const { data: response } = await axios.post(`/api/teams/${id}/invitations`, { email });
  return response;
};

export const acceptInvite = async (id: string): Promise<void> => {
  if (!id) return Promise.reject();

  const { data: response } = await axios.post(`/api/invitations/${id}/accept`, {});
  return response;
};
