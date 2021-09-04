import { EnrichedRelease } from 'types';
import axios from 'axios';
import { Artist } from '.prisma/client';

export const fetchArtists = async (): Promise<Artist[]> => {
  const { data } = await axios.get(`/api/artists`);
  return data;
};
