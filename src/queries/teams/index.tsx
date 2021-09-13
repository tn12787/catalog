import axios from 'axios';

import { Team, TeamUser } from '.prisma/client';

export const fetchTeam = async (id: string) => {
  if (!id) return; //TODO: deal with this hack

  const { data: response } = await axios.get<Team & { users: TeamUser[] }>(
    `/api/teams/${id}`
  );

  return response;
};
