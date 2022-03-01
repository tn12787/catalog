import { TaskStatus } from '@prisma/client';

import { BaseEvent } from './types';

export const deriveBadgeColorFromStatus = <T extends BaseEvent>(event: T) => {
  if (
    new Date().getTime() > new Date(event.date).getTime() &&
    event.data.status !== TaskStatus.COMPLETE
  ) {
    return 'red.500';
  }

  switch (event.data.status) {
    case TaskStatus.OUTSTANDING:
      return 'gray.500';
    case TaskStatus.IN_PROGRESS:
      return 'yellow.500';
    case TaskStatus.COMPLETE:
      return 'green.500';
    default:
      return 'purple.400';
  }
};
