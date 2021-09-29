import axios from 'axios';

import { Team, TeamMember, User } from '.prisma/client';

export const fetchMe = async () => {
  const { data: response } = await axios.get<
    User & { teams: (TeamMember & { team: Team })[] }
  >(`/api/me`);
  return response;
};
