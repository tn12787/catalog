import { UpdateBaseReleaseTaskDto } from 'backend/models/tasks/update';
import { ReleaseTaskWithAssignees, EnrichedWorkspace } from 'types/common';

interface BaseTaskEventData {
  userId: string;
  workspace: EnrichedWorkspace;
}

export interface UpdateTaskEventData extends BaseTaskEventData {
  body: UpdateBaseReleaseTaskDto;
  id: string;
}

export interface CreateTaskEventData extends BaseTaskEventData {}

export interface CreateAssigneesEventData
  extends Pick<UpdateTaskEventData, 'userId' | 'workspace'> {
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

export interface CreateNameEventData extends Pick<UpdateTaskEventData, 'userId'> {
  name: UpdateBaseReleaseTaskDto['name'];
  task: ReleaseTaskWithAssignees;
}
