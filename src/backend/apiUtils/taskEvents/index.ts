import { isEqual } from 'lodash';
import { TaskEventType } from '@prisma/client';
import { BadRequestException, NotFoundException } from '@storyofams/next-api-decorators';

import {
  CreateAssigneesEventData,
  CreateStatusEventData,
  TaskEventData,
  CreateDueDateEventIfNeeded,
} from './types';

import prisma from 'backend/prisma/client';

export const createNewTaskEvent = async ({ body, taskId, userId }: TaskEventData) => {
  if (!body) throw new BadRequestException('No body provided');

  await prisma.releaseTaskEvent.create({
    data: {
      type: TaskEventType.CREATE_TASK,
      user: { connect: { id: userId } },
      task: { connect: { id: taskId } },
      extraData: {},
    },
  });
};

export const createUpdateTaskEvents = async ({ body, taskId, userId }: TaskEventData) => {
  if (!body) throw new BadRequestException('No body provided');

  const task = await prisma.releaseTask.findUnique({
    where: { id: taskId },
    include: {
      assignees: true,
      release: { select: { teamId: true } },
    },
  });

  if (!task) throw new NotFoundException('Task not found');

  await createAsssigneesEventIfNeeded({ assignees: body.assignees, task, userId });
  await createStatusEventIfNeeded({ status: body.status, task, userId });
  await createDueDateEventIfNeeded({ dueDate: body.dueDate, task, userId });

  return task;
};

const createAsssigneesEventIfNeeded = async ({
  assignees,
  task,
  userId,
}: CreateAssigneesEventData) => {
  if (!assignees) return;

  const extraData = {
    oldAssignees: task.assignees.map(({ id }) => id),
    newAssignees: assignees,
  };

  if (isEqual(extraData.oldAssignees, extraData.newAssignees)) return;

  await prisma.releaseTaskEvent.create({
    data: {
      user: { connect: { id: userId } },
      task: { connect: { id: task.id } },
      type: TaskEventType.UPDATE_ASSIGNEES,
      extraData,
    },
  });
};

const createStatusEventIfNeeded = async ({ status, task, userId }: CreateStatusEventData) => {
  if (!status) return;

  const extraData = {
    oldStatus: task.status,
    newStatus: status,
  };

  if (isEqual(extraData.oldStatus, extraData.newStatus)) return;

  await prisma.releaseTaskEvent.create({
    data: {
      user: { connect: { id: userId } },
      task: { connect: { id: task.id } },
      type: TaskEventType.UPDATE_STATUS,
      extraData,
    },
  });
};

const createDueDateEventIfNeeded = async ({
  dueDate,
  task,
  userId,
}: CreateDueDateEventIfNeeded) => {
  if (!dueDate) return;

  const extraData = {
    oldDueDate: task.dueDate?.toISOString(),
    newDueDate: dueDate.toISOString(),
  };

  if (isEqual(extraData.oldDueDate, extraData.newDueDate)) return;

  await prisma.releaseTaskEvent.create({
    data: {
      user: { connect: { id: userId } },
      task: { connect: { id: task.id } },
      type: TaskEventType.UPDATE_DATE,
      extraData,
    },
  });
};
