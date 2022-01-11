import axios from 'axios';

import { ClientRelease } from './../../types/index';
import { EventType } from './../../components/Calendar/types';

import { ReleaseEvent } from 'types';

export const fetchReleaseEvents = async (teamId: string, assigneeId?: string) => {
  const { data: response } = await axios.get<ReleaseEvent[]>(`/api/releases/events`, {
    params: { team: teamId, assignee: assigneeId },
  });

  return response;
};

export const fetchSpecificReleaseEvents = async (id: string) => {
  const { data: response } = await axios.get<ReleaseEvent[]>(`/api/releases/${id}/events`);

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
      return axios.patch(`/api/releases/${event.release.id}/artwork`, {
        dueDate: targetDate,
      });
    case EventType.DISTRIBUTION:
      return axios.patch(`/api/releases/${event.release.id}/distribution`, {
        distributor: (event.data as ClientRelease['distribution'])?.distributorId,
        dueDate: targetDate,
      });
    case EventType.MASTERING:
      return axios.patch(`/api/releases/${event.release.id}/mastering`, {
        dueDate: targetDate,
      });
    case EventType.MUSIC_VIDEO:
      return axios.patch(`/api/releases/${event.release.id}/musicVideo`, {
        dueDate: targetDate,
      });
    case EventType.MARKETING:
      return axios.patch(`/api/releases/${event.release.id}/marketing`, {
        dueDate: targetDate,
      });
  }
};
