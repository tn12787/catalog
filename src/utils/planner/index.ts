import { format } from 'date-fns';

export const buildPlannerLink = (eventId: string, date: Date | string) => {
  return `/planner?event=${eventId}&date=${format(new Date(date || Date.now()), 'yyyy-MM-dd')}`;
};
