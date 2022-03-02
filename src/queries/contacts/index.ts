import axios from 'axios';
import { Contact } from '@prisma/client';

import { CreateContactVars, DeleteContactVars, UpdateContactVars } from './types';

import { ContactFilterOptions } from 'queries/contacts/types';
import { PaginatedQueryResult } from 'queries/types';
import { ContactWithLabels } from 'types/common';

export const fetchContacts = async ({ workspaceId, pagination, search }: ContactFilterOptions) => {
  const { data: response } = await axios.get<PaginatedQueryResult<ContactWithLabels>>(
    `/api/teams/${workspaceId}/contacts`,
    {
      params: {
        workspaceId,
        pageSize: pagination?.pageSize,
        page: pagination?.page,
        search,
      },
    }
  );

  return response;
};

export const createContact = async ({
  workspaceId,
  ...rest
}: CreateContactVars): Promise<Contact> => {
  const { data: response } = await axios.post(`/api/teams/${workspaceId}/contacts`, { ...rest });
  return response;
};

export const updateContact = async ({
  workspaceId,
  id,
  ...rest
}: UpdateContactVars): Promise<Contact> => {
  const { data: response } = await axios.patch(`/api/teams/${workspaceId}/contacts/${id}`, {
    ...rest,
  });
  return response;
};

export const deleteContact = async ({ workspaceId, id }: DeleteContactVars): Promise<Contact> => {
  const { data: response } = await axios.delete(`/api/teams/${workspaceId}/contacts/${id}`);
  return response;
};
