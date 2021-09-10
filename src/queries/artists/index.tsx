import axios from 'axios';

import { Artist } from '.prisma/client';

export const fetchArtists = async (teamId: string): Promise<Artist[]> => {
  const { data } = await axios.get(`/api/artists?team=${teamId}`);
  return data;
};

export const fetchSingleArtist = async (id: string) => {
  if (!id) return; //TODO: deal with this hack

  return await axios.get<Artist>(`/api/artists/${id}`);
};
