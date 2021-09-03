import { EnrichedRelease } from 'types';
import axios from 'axios';

export const fetchReleases = async (): Promise<EnrichedRelease[]> => {
  const { data } = await axios.get(`/api/releases`);
  return data;
};
