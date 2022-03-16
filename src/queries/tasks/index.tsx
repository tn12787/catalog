import axios from 'axios';
import { Release } from '@prisma/client';

import {
  CreateTaskVars,
  DeleteCommentVars,
  NewCommentVars,
  TaskFilterOptions,
  UpdateCommentVars,
  UpdateTaskVars,
} from './types';

import {
  EnrichedReleaseTask,
  ReleaseTaskEventWithUser,
  ReleaseTaskWithAssignees,
} from 'types/common';

export const fetchSingleTask = async (id: string) => {
  const response = await axios.get<EnrichedReleaseTask & { release: Release }>(`/api/tasks/${id}`);

  return response.data;
};

export const fetchTaskList = async (params: TaskFilterOptions) => {
  const response = await axios.get<(EnrichedReleaseTask & { release: Release })[]>(`/api/tasks`, {
    params,
  });

  return response.data;
};

export const fetchTaskActivity = async (id: string) => {
  return await axios.get<ReleaseTaskEventWithUser[]>(`/api/tasks/${id}/activity`);
};

export const createTask = async ({
  releaseId,
  ...rest
}: CreateTaskVars): Promise<ReleaseTaskWithAssignees | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/tasks`, {
    ...rest,
  });
  return response;
};

export const updateTask = async ({ id, ...rest }: UpdateTaskVars) => {
  if (!id) throw new Error('No task ID passed to update.');

  return await axios.patch<ReleaseTaskWithAssignees>(`/api/tasks/${id}`, rest);
};

export const deleteTask = async ({ id }: Pick<UpdateTaskVars, 'id'>) => {
  if (!id) throw new Error('No task ID passed to update.');

  return await axios.delete<ReleaseTaskWithAssignees>(`/api/tasks/${id}`);
};

export const postNewComment = async ({ id, text }: NewCommentVars) => {
  if (!id) throw new Error('No task ID passed to post comment for.');

  return await axios.post(`/api/tasks/${id}/activity/comments`, { text });
};

export const updateComment = async ({ commentId, taskId, text }: UpdateCommentVars) => {
  if (!taskId || !commentId)
    throw new Error('No task ID or comment ID passed to update comment for.');

  return await axios.put(`/api/tasks/${taskId}/activity/comments/${commentId}`, { text });
};

export const deleteComment = async ({ commentId, taskId }: DeleteCommentVars) => {
  if (!taskId || !commentId)
    throw new Error('No task ID or comment ID passed to delete comment for.');

  return await axios.delete(`/api/tasks/${taskId}/activity/comments/${commentId}`);
};
