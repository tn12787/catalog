import { User, TeamMember } from '@prisma/client';
import axios from 'axios';

export const sendUserInvitation = async ({
  id,
  email,
  role,
}: Pick<User, 'email'> & { id: string; role: string }): Promise<void> => {
  if (!id) return Promise.reject();

  const { data: response } = await axios.post(`/api/teams/${id}/invitations`, { email, role });
  return response;
};

export const acceptInvite = async (id: string): Promise<TeamMember> => {
  if (!id) return Promise.reject();

  const { data: response } = await axios.post(`/api/invitations/${id}/accept`, {});
  return response;
};
