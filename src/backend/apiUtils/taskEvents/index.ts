import { isEqual } from 'lodash';
import { TaskEventType } from '@prisma/client';
import { BadRequestException, NotFoundException } from 'next-api-decorators';

import {
  CreateAssigneesEventData,
  CreateStatusEventData,
  UpdateTaskEventData,
  CreateDueDateEventData,
  CreateTaskEventData,
  CreateNameEventData,
} from './types';

import { hasPaidPlan } from 'utils/billing';
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
  id,
  userId,
  workspace,
}: UpdateTaskEventData) => {
  if (!body) throw new BadRequestException('No body provided');

  const task = await prisma.releaseTask.findUnique({
    where: { id },
    include: {
      assignees: { include: { user: true } },
      contacts: { include: { labels: true } },
      release: { select: { workspaceId: true } },
    },
  });

  if (!task) throw new NotFoundException('Task not found');

  const events = [
    createAsssigneesEventIfNeeded({ assignees: body.assignees, task, userId, workspace }),
    createStatusEventIfNeeded({ status: body.status, task, userId }),
    createDueDateEventIfNeeded({ dueDate: body.dueDate, task, userId }),
    createNameEventIfNeeded({ name: body.name, task, userId }),
  ];

  return events.filter(Boolean);
};

const createAsssigneesEventIfNeeded = ({
  assignees,
  task,
  userId,
  workspace,
}: CreateAssigneesEventData) => {
  if (!assignees || !hasPaidPlan(workspace, 'Label Plan')) return;

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

const createDueDateEventIfNeeded = ({ dueDate, task, userId }: CreateDueDateEventData) => {
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

const createNameEventIfNeeded = ({ name, task, userId }: CreateNameEventData) => {
  if (!name) return;

  const extraData = {
    oldName: task.name,
    newName: name,
  };

  if (isEqual(extraData.oldName, extraData.newName)) return;

  return {
    user: { connect: { id: userId } },
    type: TaskEventType.UPDATE_NAME,
    extraData,
  };
};
