import { TaskStatus } from '@prisma/client';

import { daysFromNow, daysBeforeNow } from 'backend/apiUtils/dates';
import prisma from 'backend/prisma/client';

const tasksAreOutstanding = {
  AND: {
    status: { not: TaskStatus.COMPLETE },
    dueDate: { lte: daysFromNow(2) },
  },
};

const freeTasksAreOutstanding = {
  ...tasksAreOutstanding,
  AND: {
    ...tasksAreOutstanding.AND,
    dueDate: { ...tasksAreOutstanding.AND.dueDate, gte: daysBeforeNow(2) },
  },
};

export const fetchPaidWorkspaceMembersToNotify = async () => {
  const workspaceMembersToNotify = await prisma.workspaceMember.findMany({
    where: {
      OR: [
        {
          AND: {
            tasksAssigned: {
              some: tasksAreOutstanding,
            },
            workspace: { subscription: { isNot: null } },
          },
        },
        {
          AND: {
            tasksAssigned: {
              some: freeTasksAreOutstanding,
            },
            workspace: { subscription: { is: null } },
          },
        },
      ],
    },
    include: {
      user: { include: { emailPreferences: true } },
      workspace: { include: { subscription: true } },
      tasksAssigned: {
        where: tasksAreOutstanding,
        select: {
          id: true,
          type: true,
          name: true,
          release: { select: { name: true } },
          status: true,
          dueDate: true,
        },
      },
    },
  });

  return workspaceMembersToNotify;
};
