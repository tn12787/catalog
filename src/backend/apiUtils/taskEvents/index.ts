import { isEqual } from 'lodash';
import { TaskEventType } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@storyofams/next-api-decorators';

import {
  CreateAssigneesEventData,
  CreateStatusEventData,
  UpdateTaskEventData,
  CreateDueDateEventIfNeeded,
  CreateTaskEventData,
} from './types';

import prisma from 'backend/prisma/client';

export const buildCreateTaskEvent = ({ userId }: CreateTaskEventData) => {
  return {
    type: TaskEventType.CREATE_TASK,
    user: { connect: { id: userId } },
    extraData: {},
  };
};

export const createUpdateTaskEvents = async ({
  body,
  releaseId,
  type,
  userId,
}: UpdateTaskEventData) => {
  if (!body) throw new BadRequestException('No body provided');

  const task = await prisma.releaseTask.findUnique({
    where: { releaseId_type: { releaseId, type } },
    include: {
      assignees: { include: { user: true } },
      contacts: { include: { labels: true } },
      release: { select: { teamId: true } },
    },
  });

  if (!task) throw new NotFoundException('Task not found');

  const tasks = [
    createAsssigneesEventIfNeeded({ assignees: body.assignees, task, userId }),
    createStatusEventIfNeeded({ status: body.status, task, userId }),
    createDueDateEventIfNeeded({ dueDate: body.dueDate, task, userId }),
  ];

  return tasks.filter(Boolean);
};

const createAsssigneesEventIfNeeded = ({ assignees, task, userId }: CreateAssigneesEventData) => {
  if (!assignees) return;

  const extraData = {
    oldAssignees: task.assignees.map(({ id }) => id),
    newAssignees: assignees,
  };

  if (isEqual(extraData.oldAssignees, extraData.newAssignees)) return;

  return {
    user: { connect: { id: userId } },
    type: TaskEventType.UPDATE_ASSIGNEES,
    extraData,
  };
};

const createStatusEventIfNeeded = ({ status, task, userId }: CreateStatusEventData) => {
  if (!status) return;

  const extraData = {
    oldStatus: task.status,
    newStatus: status,
  };

  if (isEqual(extraData.oldStatus, extraData.newStatus)) return;

  return {
    user: { connect: { id: userId } },
    type: TaskEventType.UPDATE_STATUS,
    extraData,
  };
};

const createDueDateEventIfNeeded = ({ dueDate, task, userId }: CreateDueDateEventIfNeeded) => {
  if (!dueDate) return;

  const extraData = {
    oldDueDate: new Date(task.dueDate as Date).toISOString(),
    newDueDate: new Date(dueDate).toISOString(),
  };

  if (isEqual(extraData.oldDueDate, extraData.newDueDate)) return;

  return {
    user: { connect: { id: userId } },
    type: TaskEventType.UPDATE_DATE,
    extraData,
  };
};
