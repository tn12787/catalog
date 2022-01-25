import axios from 'axios';
import { Release } from '@prisma/client';

import { DeleteCommentVars, NewCommentVars, UpdateCommentVars, UpdateTaskVars } from './types';

import { ReleaseTaskEventWithUser, ReleaseTaskWithAssignees } from 'types/common';

export const fetchSingleTask = async (id: string) => {
  return await axios.get<ReleaseTaskWithAssignees & { release: Release }>(`/api/tasks/${id}`);
};

export const fetchTaskActivity = async (id: string) => {
  return await axios.get<ReleaseTaskEventWithUser[]>(`/api/tasks/${id}/activity`);
};

export const updateTask = async ({ id, ...rest }: UpdateTaskVars) => {
  if (!id) throw new Error('No task ID passed to update.');

  return await axios.patch<ReleaseTaskEventWithUser[]>(`/api/tasks/${id}`, rest);
};

export const postNewComment = async ({ id, text }: NewCommentVars) => {
  if (!id) throw new Error('No task ID passed to post comment for.');

  return await axios.post(`/api/tasks/${id}/activity/comments`, { text });
};

export const updateComment = async ({ commentId, taskId, text }: UpdateCommentVars) => {
  if (!taskId || !commentId) return;

  return await axios.put(`/api/tasks/${taskId}/activity/comments/${commentId}`, { text });
};

export const deleteComment = async ({ commentId, taskId }: DeleteCommentVars) => {
  if (!taskId || !commentId) return;

  return await axios.delete(`/api/tasks/${taskId}/activity/comments/${commentId}`);
};
