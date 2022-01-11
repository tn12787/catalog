import { ReleaseTaskType } from '@prisma/client';
import { InternalServerErrorException } from '@storyofams/next-api-decorators';

import { EnrichedRelease, EnrichedReleaseTask, EventType, ReleaseEvent } from 'types';

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
        date: task.dueDate?.toISOString() ?? '',
        type: EventType.ARTWORK,
        data: task,
        release: release,
      };
    case ReleaseTaskType.DISTRIBUTION:
      return {
        name: `${release.name}: distribution`,
        date: task.dueDate?.toISOString() ?? '',
        type: EventType.DISTRIBUTION,
        data: task,
        release: release,
      };
    case ReleaseTaskType.MARKETING:
      return {
        name: `${release.name}: marketing`,
        date: task.dueDate?.toISOString() ?? '',
        type: EventType.MARKETING,
        data: task,
        release: release,
      };
    case ReleaseTaskType.MASTERING:
      return {
        name: `${release.name}: mastering`,
        date: task.dueDate?.toISOString() ?? '',
        type: EventType.MASTERING,
        data: task,
        release: release,
      };
    case ReleaseTaskType.MUSIC_VIDEO:
      return {
        name: `${release.name}: music video`,
        date: task.dueDate?.toISOString() ?? '',
        type: EventType.MUSIC_VIDEO,
        data: task,
        release: release,
      };
    default:
      throw new InternalServerErrorException();
  }
};
