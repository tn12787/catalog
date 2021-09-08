import { ReleaseEvent } from 'types';
import axios from 'axios';

export const fetchReleaseEvents = async () => {
  const { data: response } = await axios.get<ReleaseEvent[]>(
    `/api/releases/events`
  );

  return response;
};
