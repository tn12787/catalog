import axios from 'axios';
import { Team, TeamMember, User } from '@prisma/client';

import { UpdateUserVars } from './types';

export const fetchMe = async () => {
  const { data: response } = await axios.get<
    User & { teams: (TeamMember & { workspace: Team })[] }
  >(`/api/me`);
  return response;
};

export const updateSingleUser = async ({ id, ...data }: UpdateUserVars) => {
  if (!id) throw new Error('Missing user id for update');

  const { data: response } = await axios.put(`/api/users/${id}`, {
    ...data,
  });

  return response;
};
