import { FilterOptions } from 'queries/types';

export interface NotificationFilterOptions extends Pick<FilterOptions<Notification>, 'pagination'> {
  teamMemberId: string;
}
