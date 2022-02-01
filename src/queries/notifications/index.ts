import axios from 'axios';
import { Notification } from '@prisma/client';

import { NotificationFilterOptions } from './../../pages/notifications/types';
import { UpdateNotificationVars } from './types';

import { PaginatedQueryResult } from 'queries/types';

export const fetchNotifications = async ({
  teamMemberId,
  pagination,
}: NotificationFilterOptions) => {
  const { data: response } = await axios.get<PaginatedQueryResult<Notification>>(
    '/api/notifications',
    {
      params: {
        teamMemberId,
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
