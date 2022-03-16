import { NotificationType } from '@prisma/client';
import { differenceInCalendarDays } from 'date-fns';

import { NotificationVisualData } from './types';

import { NotificationWithTask } from 'types/common';
import { taskHeadingByType } from 'utils/tasks';

const dayDifferenceToString = (difference: number): string => {
  if (difference === 0) {
    return 'now overdue';
  }

  if (difference < 0) {
    return `due in ${-difference} days`;
  }

  return `overdue by ${difference} days`;
};

export const notificationToCopyAndLink = (
  notification: NotificationWithTask
): NotificationVisualData => {
  switch (notification.type) {
    case NotificationType.TASK_ASSIGNED:
      return {
        message: `${notification.actor?.user.name} assigned you to ${taskHeadingByType(
          notification.task.name,
          notification.task.type,
          notification.task.release.name
        )} `,
        link: `/tasks/${notification.task.id}`,
      };
    case NotificationType.TASK_COMMENT:
      return {
        message: `${notification.actor?.user.name} left a comment on ${taskHeadingByType(
          notification.task.name,
          notification.task.type,
          notification.task.release.name
        )} `,
        link: `/tasks/${notification.task.id}`,
      };
    case NotificationType.TASK_OVERDUE:
    default:
      if (!notification.task?.dueDate) {
        return {
          message: `${taskHeadingByType(notification.task.name, notification.task.type)} for ${
            notification.task.release?.name
          } is now overdue`,
          link: `/tasks/${notification.task.id}`,
        };
      }
      const dayDifference = differenceInCalendarDays(
        new Date(),
        new Date(notification.task.dueDate)
      );

      return {
        message: `${taskHeadingByType(
          notification.task.name,
          notification.task.type,
          notification.task.release.name
        )} is ${dayDifferenceToString(dayDifference)}.`,
        link: `/tasks/${notification.task.id}`,
      };
  }
};
