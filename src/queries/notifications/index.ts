import axios from 'axios';
import { Notification } from '@prisma/client';

export const fetchNotifications = async (teamMemberId: string): Promise<Notification[]> => {
  const { data: response } = await axios.get('/api/notifications', { params: { teamMemberId } });
  return response;
};
