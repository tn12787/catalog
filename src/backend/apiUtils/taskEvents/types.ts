import { UpdateBaseReleaseTaskDto } from 'backend/models/tasks/update';
import { ReleaseTaskWithAssignees } from 'types/common';

interface BaseTaskEventData {
  userId: string;
}

export interface UpdateTaskEventData extends BaseTaskEventData {
  body: UpdateBaseReleaseTaskDto;
  id: string;
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

export interface CreateDueDateEventData extends Pick<UpdateTaskEventData, 'userId'> {
  dueDate: UpdateBaseReleaseTaskDto['dueDate'];
  task: ReleaseTaskWithAssignees;
}
