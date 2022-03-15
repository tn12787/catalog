import { ReleaseTask } from '@prisma/client';

import { FilterOptions } from 'queries/types';
import { ReleaseTaskWithAssignees } from 'types/common';

export interface TaskFilterOptions extends FilterOptions<ReleaseTask> {
  workspace: string;
  assignee?: string;
}

export interface NewCommentVars {
  id: string;
  text: string;
}

export type ExistingCommentVars = {
  taskId: string;
  commentId: string;
};

export type UpdateCommentVars = ExistingCommentVars & { text: string };
export type DeleteCommentVars = ExistingCommentVars;

export type UpdateTaskVars = Partial<
  Pick<ReleaseTaskWithAssignees, 'id' | 'dueDate' | 'notes' | 'name' | 'status'> & {
    url?: string;
    distributor?: string;
    assignees?: string[];
    contacts?: string[];
  }
>;

export type CreateTaskVars = Pick<
  ReleaseTaskWithAssignees,
  'name' | 'type' | 'dueDate' | 'notes' | 'status'
> & {
  releaseId: string;
  url?: string;
  distributor?: string;
  assignees: string[];
  contacts: string[];
};
