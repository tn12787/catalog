import { addHours, startOfDay } from 'date-fns';

export const midday = (date: Date | string) => {
  const resolvedDate = new Date(date);
  return addHours(startOfDay(resolvedDate), 12);
};
