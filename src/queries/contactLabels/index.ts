import axios from 'axios';
import { ContactLabel } from '@prisma/client';

import { CreateContactLabelVars, DeleteContactLabelVars, UpdateContactLabelVars } from './types';

import { ContactLabelFilterOptions } from 'queries/contactLabels/types';
import { ContactLabelWithContacts } from 'types/common';

export const fetchContactLabels = async ({ workspaceId, search }: ContactLabelFilterOptions) => {
  const { data: response } = await axios.get<ContactLabelWithContacts[]>(
    `/api/workspaces/${workspaceId}/contacts/labels`,
    {
      params: {
        workspaceId,
        search,
      },
    }
  );

  return response;
};

export const createContactLabel = async ({
  workspaceId,
  ...rest
}: CreateContactLabelVars): Promise<ContactLabel> => {
  const { data: response } = await axios.post(`/api/workspaces/${workspaceId}/contacts/labels`, {
    ...rest,
  });
  return response;
};

export const updateContactLabel = async ({
  workspaceId,
  id,
  ...rest
}: UpdateContactLabelVars): Promise<ContactLabel> => {
  const { data: response } = await axios.patch(
    `/api/workspaces/${workspaceId}/contacts/labels/${id}`,
    {
      ...rest,
    }
  );
  return response;
};

export const deleteContactLabel = async ({
  workspaceId,
  id,
}: DeleteContactLabelVars): Promise<ContactLabel> => {
  const { data: response } = await axios.delete(
    `/api/workspaces/${workspaceId}/contacts/labels/${id}`
  );
  return response;
};
