import axios from 'axios';
import { Notification } from '@prisma/client';

import { UpdateNotificationVars, BatchUpdateNotificationVars } from './types';

import { NotificationFilterOptions } from 'queries/notifications/types';
import { PaginatedQueryResult } from 'queries/types';
import { NotificationWithTask } from 'types/common';

export const fetchNotifications = async ({
  workspaceMemberId,
  read,
  pagination,
}: NotificationFilterOptions) => {
  const { data: response } = await axios.get<PaginatedQueryResult<NotificationWithTask>>(
    '/api/notifications',
    {
      params: {
        workspaceMemberId,
        read,
        pageSize: pagination?.pageSize,
        page: pagination?.page,
      },
    }
  );

  return response;
};

export const updateNotification = async ({
  id,
  read,
}: UpdateNotificationVars): Promise<Notification> => {
  const { data: response } = await axios.patch(`/api/notifications/${id}`, {
    read,
  });
  return response;
};

export const batchUpdateNotifications = async (
  notifications: BatchUpdateNotificationVars
): Promise<Notification> => {
  const { data: response } = await axios.patch(`/api/notifications`, {
    ...notifications,
  });
  return response;
};

export const markAllAsRead = async (workspaceMemberId: string) => {
  const { data: response } = await axios.patch('/api/notifications/all', {
    workspaceMemberId,
    read: true,
  });

  return response;
};

export const clearAllNotifications = async (workspaceMemberId: string): Promise<Notification> => {
  const { data: response } = await axios.delete(`/api/notifications/all`, {
    params: {
      workspaceMemberId,
    },
  });
  return response;
};
