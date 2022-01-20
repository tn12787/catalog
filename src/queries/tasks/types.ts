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
