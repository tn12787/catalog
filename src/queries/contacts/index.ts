import axios from 'axios';
import { Contact } from '@prisma/client';

import { CreateContactVars, DeleteContactVars, UpdateContactVars } from './types';

import { ContactFilterOptions } from 'queries/contacts/types';
import { PaginatedQueryResult } from 'queries/types';
import { ContactWithLabels } from 'types/common';

export const fetchContacts = async ({ teamId, pagination, search }: ContactFilterOptions) => {
  const { data: response } = await axios.get<PaginatedQueryResult<ContactWithLabels>>(
    `/api/teams/${teamId}/contacts`,
    {
      params: {
        teamId,
        pageSize: pagination?.pageSize,
        page: pagination?.page,
        search,
      },
    }
  );

  return response;
};

export const createContact = async ({ teamId, ...rest }: CreateContactVars): Promise<Contact> => {
  const { data: response } = await axios.post(`/api/teams/${teamId}/contacts`, { ...rest });
  return response;
};

export const updateContact = async ({
  teamId,
  id,
  ...rest
}: UpdateContactVars): Promise<Contact> => {
  const { data: response } = await axios.patch(`/api/teams/${teamId}/contacts/${id}`, {
    ...rest,
  });
  return response;
};

export const deleteContact = async ({ teamId, id }: DeleteContactVars): Promise<Contact> => {
  const { data: response } = await axios.delete(`/api/teams/${teamId}/contacts/${id}`);
  return response;
};
