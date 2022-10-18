import { ReleaseTaskType } from '@prisma/client';
import { InternalServerErrorException } from 'next-api-decorators';

import { flattenField } from '../transforms/releases';

import {
  ClientReleaseTaskData,
  EnrichedRelease,
  EnrichedReleaseTask,
  EventType,
  ReleaseEvent,
} from 'types/common';

export const getEventsForRelease = (
  release: EnrichedRelease,
  includeBaseRelease = true
): ReleaseEvent[] => {
  const allEvents = [
    includeBaseRelease && {
      name: release.name,
      date: release.targetDate,
      type: EventType.RELEASE,
      release,
      data: release,
    },
    ...release.tasks.map((task) => taskToEvent(release, task)),
  ].filter(Boolean) as ReleaseEvent[];

  return allEvents.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
};

const taskToEvent = (release: EnrichedRelease, task: EnrichedReleaseTask): ReleaseEvent => {
  switch (task.type) {
    case ReleaseTaskType.ARTWORK:
      return {
        name: `${release.name}: artwork`,
        date: (task.dueDate as Date)?.toISOString() ?? '',
        type: EventType.ARTWORK,
        data: flattenField(release, ReleaseTaskType.ARTWORK) as ClientReleaseTaskData,
        release: release,
      };
    case ReleaseTaskType.DISTRIBUTION:
      return {
        name: `${release.name}: distribution`,
        date: (task.dueDate as Date)?.toISOString() ?? '',
        type: EventType.DISTRIBUTION,
        data: flattenField(release, ReleaseTaskType.DISTRIBUTION) as ClientReleaseTaskData,
        release: release,
      };
    case ReleaseTaskType.GENERIC:
      return {
        name: `${release.name}: ${task.name}`,
        date: (task.dueDate as Date)?.toISOString() ?? '',
        type: EventType.GENERIC,
        data: { ...task, release: release },
        release: release,
      };
    case ReleaseTaskType.MASTERING:
      return {
        name: `${release.name}: mastering`,
        date: (task.dueDate as Date)?.toISOString() ?? '',
        type: EventType.MASTERING,
        data: flattenField(release, ReleaseTaskType.MASTERING) as ClientReleaseTaskData,
        release: release,
      };

    default:
      throw new InternalServerErrorException();
  }
};
