import { Contact, ContactLabel } from '@prisma/client';

import { FilterOptions } from 'queries/types';

export interface ContactLabelFilterOptions extends Pick<FilterOptions<Contact>, 'search'> {
  workspaceId: string;
}

export type UpdateContactLabelVars = Pick<ContactLabel, 'name' | 'workspaceId' | 'color' | 'id'>;

export type CreateContactLabelVars = Omit<UpdateContactLabelVars, 'id'>;

export type DeleteContactLabelVars = Pick<UpdateContactLabelVars, 'name' | 'workspaceId' | 'id'>;

export type BatchUpdateContactLabelVars = { ids: string[]; read: boolean };
