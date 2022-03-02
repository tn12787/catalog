import { Notification } from '@prisma/client';

import { FilterOptions } from 'queries/types';

export interface NotificationFilterOptions extends Pick<FilterOptions<Notification>, 'pagination'> {
  workspaceMemberId: string;
  read?: boolean;
}

export type UpdateNotificationVars = Pick<Notification, 'id' | 'read'>;

export type BatchUpdateNotificationVars = { ids: string[]; read: boolean };
