import { Contact, ContactLabel } from '@prisma/client';

import { FilterOptions } from 'queries/types';

export interface ContactFilterOptions
  extends Pick<FilterOptions<Contact>, 'pagination' | 'search'> {
  workspaceId: string;
}

export type UpdateContactVars = Pick<
  Contact & { labels?: ContactLabel[] },
  'id' | 'name' | 'labels' | 'email' | 'phone' | 'workspaceId' | 'website'
>;

export type CreateContactVars = Omit<UpdateContactVars, 'id'>;

export type DeleteContactVars = Pick<UpdateContactVars, 'id' | 'workspaceId'>;

export type BatchUpdateContactVars = { ids: string[]; read: boolean };
