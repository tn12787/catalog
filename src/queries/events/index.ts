import axios from 'axios';

import { EventType } from './../../components/Calendar/types';

import { ReleaseEvent } from 'types';

export const fetchReleaseEvents = async (teamId: string) => {
  const { data: response } = await axios.get<ReleaseEvent[]>(
    `/api/releases/events`,
    { params: { team: teamId } }
  );

  return response;
};

export const updateEventInCalendar = async ({
  event,
  targetDate,
}: {
  event: ReleaseEvent;
  targetDate: string;
}) => {
  switch (event.type) {
    case EventType.RELEASE:
      return axios.put(`/api/releases/${event.release.id}`, {
        name: event.release.name,
        type: event.release.type,
        artist: event.release.artist.id,
        targetDate,
      });
    case EventType.ARTWORK:
      return axios.put(`/api/releases/${event.release.id}/artwork`, {
        ...event.data,
        dueDate: targetDate,
      });
    case EventType.DISTRIBUTION:
      return axios.put(`/api/releases/${event.release.id}/distribution`, {
        ...event.data,
        distributor: event.data.distributor.id,
        dueDate: targetDate,
      });
    case EventType.MASTERING:
      return axios.put(`/api/releases/${event.release.id}/mastering`, {
        ...event.data,
        dueDate: targetDate,
      });
    case EventType.MUSIC_VIDEO:
      return axios.put(`/api/releases/${event.release.id}/musicVideo`, {
        ...event.data,
        dueDate: targetDate,
      });
    case EventType.MARKETING:
      return axios.put(`/api/releases/${event.release.id}/marketing`, {
        ...event.data,
        dueDate: targetDate,
      });
  }
};
