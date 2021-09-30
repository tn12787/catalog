import axios from 'axios';

import { UpdateUserVars } from './types';

import { Team, TeamMember, User } from '.prisma/client';

export const fetchMe = async () => {
  const { data: response } = await axios.get<
    User & { teams: (TeamMember & { team: Team })[] }
  >(`/api/me`);
  return response;
};

export const updateSingleUser = async ({ id, ...data }: UpdateUserVars) => {
  if (!id) return; //TODO: deal with this hack

  const { data: response } = await axios.put(`/api/users/${id}`, {
    ...data,
  });

  return response;
};
