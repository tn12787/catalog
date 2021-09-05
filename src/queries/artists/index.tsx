import axios from 'axios';
import { Artist } from '.prisma/client';

export const fetchArtists = async (): Promise<Artist[]> => {
  const { data } = await axios.get(`/api/artists`);
  return data;
};

export const fetchSingleArtist = async (id: string) => {
  if (!id) return; //TODO: deal with this hack

  return await axios.get<Artist>(`/api/artists/${id}`);
};
