import { Team, TeamUser, User } from '.prisma/client';
import axios from 'axios';

export const fetchMe = async () => {
  const { data: response } = await axios.get<
    User & { teams: (TeamUser & { team: Team })[] }
  >(`/api/me`);
  return response;
};
