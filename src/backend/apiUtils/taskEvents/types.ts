import { ReleaseTaskType } from '@prisma/client';

import { UpdateBaseReleaseTaskDto } from 'backend/models/tasks/update';
import { ReleaseTaskWithAssignees } from 'types/common';

interface BaseTaskEventData {
  userId: string;
}

export interface UpdateTaskEventData extends BaseTaskEventData {
  body: UpdateBaseReleaseTaskDto;
  releaseId: string;
  type: ReleaseTaskType;
}

export interface CreateTaskEventData extends BaseTaskEventData {}

export interface CreateAssigneesEventData extends Pick<UpdateTaskEventData, 'userId'> {
  assignees: UpdateBaseReleaseTaskDto['assignees'];
  task: ReleaseTaskWithAssignees;
}

export interface CreateStatusEventData extends Pick<UpdateTaskEventData, 'userId'> {
  status: UpdateBaseReleaseTaskDto['status'];
  task: ReleaseTaskWithAssignees;
}

export interface CreateDueDateEventIfNeeded extends Pick<UpdateTaskEventData, 'userId'> {
  dueDate: UpdateBaseReleaseTaskDto['dueDate'];
  task: ReleaseTaskWithAssignees;
}
