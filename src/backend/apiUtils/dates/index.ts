import { add } from 'date-fns';

export const daysFromNow = (days: number) => {
  return add(new Date(), { days });
};
