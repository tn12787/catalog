import { Contact, ContactLabel } from '@prisma/client';

import { FilterOptions } from 'queries/types';

export interface ContactLabelFilterOptions extends Pick<FilterOptions<Contact>, 'search'> {
  teamId: string;
}

export type UpdateContactLabelVars = Pick<ContactLabel, 'name' | 'teamId' | 'color' | 'id'>;

export type CreateContactLabelVars = Omit<UpdateContactLabelVars, 'id'>;

export type DeleteContactLabelVars = Pick<UpdateContactLabelVars, 'name' | 'teamId' | 'id'>;

export type BatchUpdateContactLabelVars = { ids: string[]; read: boolean };
