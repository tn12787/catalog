import { ReleaseTask, ReleaseTaskType, TaskStatus } from '@prisma/client';
import { addDays, isBefore, startOfDay } from 'date-fns';

export const taskHeadingByType = (
  taskName: string | null,
  type: ReleaseTaskType,
  releaseName?: string
) => {
  const releasePrefix = releaseName ? `${releaseName}: ` : '';
  switch (type) {
    case ReleaseTaskType.ARTWORK:
      return `${releasePrefix}🎨 Artwork`;
    case ReleaseTaskType.DISTRIBUTION:
      return `${releasePrefix}📦 Distribution`;
    case ReleaseTaskType.MASTERING:
      return `${releasePrefix}🎧 Mastering`;
    case ReleaseTaskType.GENERIC:
      return `${releasePrefix}${taskName || 'Generic Task'}`;
    default:
      return `${releasePrefix}${taskName ?? '🚩 Release Day'}`;
  }
};

export const isTaskComplete = (task: ReleaseTask) => task.status === TaskStatus.COMPLETE;

export const isTaskOverdue = (task: ReleaseTask) => {
  return !isTaskComplete(task) && isBefore(new Date(task.dueDate as Date), Date.now());
};

export const defaultTaskDueDate = () => {
  return addDays(startOfDay(new Date()), 7);
};
