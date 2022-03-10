import { ReleaseTask, TaskStatus } from '@prisma/client';
import { Text } from '@chakra-ui/react';
import { format } from 'date-fns';

import { SummaryField } from '../Summary';

import { ReleaseTaskWithAssignees, WorkspaceMemberWithUser } from 'types/common';
import AssigneeBadgeList from 'components/tasks/assignees/AssigneeBadge/AssigneeBadgeList';
import TaskStatusBadge from 'components/tasks/TaskStatusBadge';
import { isTaskComplete } from 'utils/tasks';

export const defaultFields = (task?: ReleaseTaskWithAssignees): SummaryField[] => {
  if (!task) {
    return [];
  }

  return [
    {
      name: 'Assignees',
      content: <AssigneeBadgeList assignees={task.assignees as WorkspaceMemberWithUser[]} />,
    },
    {
      name: 'Status',
      content: <TaskStatusBadge status={task.status as TaskStatus} />,
    },
    task.dueDate && {
      name: `${isTaskComplete(task as ReleaseTask) ? 'Original ' : ''}Due Date`,
      content: <Text fontSize="sm">{format(new Date(task.dueDate), 'PPP')}</Text>,
    },
  ].filter(Boolean) as SummaryField[];
};
