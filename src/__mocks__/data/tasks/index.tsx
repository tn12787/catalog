import { ReleaseTask, ReleaseTaskType, TaskStatus } from '@prisma/client';

import { ClientReleaseTaskData } from 'types/common';

export const testReleaseTask = (extraFields: Partial<ReleaseTask>): ReleaseTask => {
  return {
    id: 'test-release-task-id',
    notes: 'test-release-task-description',
    dueDate: new Date(),
    status: TaskStatus.OUTSTANDING,
    name: 'Test release task',
    type: ReleaseTaskType.ARTWORK,
    calendarEventId: null,
    releaseId: 'test-release-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...extraFields,
  };
};

export const testClientReleaseTaskData = (
  extraFields: Partial<ClientReleaseTaskData>
): ClientReleaseTaskData => {
  return {
    id: 'test-release-task-id',
    notes: 'test-release-task-description',
    dueDate: new Date(),
    status: TaskStatus.OUTSTANDING,
    type: ReleaseTaskType.ARTWORK,
    name: 'Test release task',
    calendarEventId: null,
    releaseId: 'test-release-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    assignees: [],
    contacts: [],
    url: null,
    ...extraFields,
  };
};
