import { ReleaseTaskWithAssignees } from 'types/common';

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
  Pick<ReleaseTaskWithAssignees, 'assignees' | 'dueDate' | 'notes' | 'status'> &
    Pick<ReleaseTaskWithAssignees, 'id'>
>;
