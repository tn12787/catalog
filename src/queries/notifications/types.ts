import { Notification } from '@prisma/client';

export type UpdateNotificationVars = Pick<Notification, 'id' | 'read'>;
