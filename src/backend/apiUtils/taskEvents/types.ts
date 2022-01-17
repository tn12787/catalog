import { UpdateArtworkDto } from 'backend/models/artwork/update';
import { ReleaseTaskWithAssignees } from 'types';

export interface TaskEventData {
  body: UpdateArtworkDto;
  taskId: string;
  userId: string;
}

export interface CreateAssigneesEventData extends Pick<TaskEventData, 'userId'> {
  assignees: UpdateArtworkDto['assignees'];
  task: ReleaseTaskWithAssignees;
}

export interface CreateStatusEventData extends Pick<TaskEventData, 'userId'> {
  status: UpdateArtworkDto['status'];
  task: ReleaseTaskWithAssignees;
}

export interface CreateDueDateEventIfNeeded extends Pick<TaskEventData, 'userId'> {
  dueDate: UpdateArtworkDto['dueDate'];
  task: ReleaseTaskWithAssignees;
}
