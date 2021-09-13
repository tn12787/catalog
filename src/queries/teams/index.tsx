import axios from 'axios';

import { Team, TeamUser } from '.prisma/client';
import { TeamUserWithUser } from 'components/teams/TeamMembersTable/types';

export const fetchTeam = async (id: string) => {
  if (!id) return; //TODO: deal with this hack

  const { data: response } = await axios.get<
    Team & { users: TeamUserWithUser[] }
  >(`/api/teams/${id}`);

  return response;
};
