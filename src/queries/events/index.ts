import axios from 'axios';

import { EventType } from 'components/planner/Calendar/types';
import { ReleaseEvent } from 'types/common';

export const fetchReleaseEvents = async (workspaceId: string, assigneeId?: string) => {
  const { data: response } = await axios.get<ReleaseEvent[]>(`/api/releases/events`, {
    params: { workspace: workspaceId, assignee: assigneeId },
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
      return axios.patch(`/api/releases/${event.release.id}`, {
        name: event.release.name,
        type: event.release.type,
        artist: event.release.artist.id,
        targetDate,
      });

    case EventType.DISTRIBUTION:
    case EventType.MASTERING:
    case EventType.ARTWORK:
    case EventType.GENERIC:
      return axios.patch(`/api/tasks/${event.data.id}`, {
        dueDate: targetDate,
      });
  }
};
