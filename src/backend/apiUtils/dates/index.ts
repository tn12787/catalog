import { add, sub } from 'date-fns';

export const daysFromNow = (days: number) => {
  return add(new Date(), { days });
};

export const daysBeforeNow = (days: number) => {
  return sub(new Date(), { days });
};
