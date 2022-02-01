import { NotificationType } from '@prisma/client';

import { NotificationVisualData } from './types';

import { NotificationWithTask } from 'types/common';
import { taskHeadingByType } from 'utils/tasks';

export const notificationToCopyAndLink = (
  notification: NotificationWithTask
): NotificationVisualData => {
  switch (notification.type) {
    case NotificationType.TASK_OVERDUE:
    default:
      return {
        message: `${taskHeadingByType(notification.task.type)} for ${
          notification.task.release?.name
        } is now overdue`,
        link: `/tasks/${notification.task.id}`,
      };
  }
};
