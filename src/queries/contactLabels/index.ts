import axios from 'axios';
import { ContactLabel } from '@prisma/client';

import { CreateContactLabelVars, DeleteContactLabelVars, UpdateContactLabelVars } from './types';

import { ContactLabelFilterOptions } from 'queries/contactLabels/types';
import { ContactLabelWithContacts } from 'types/common';

export const fetchContactLabels = async ({ teamId, search }: ContactLabelFilterOptions) => {
  const { data: response } = await axios.get<ContactLabelWithContacts[]>(
    `/api/teams/${teamId}/contacts/labels`,
    {
      params: {
        teamId,
        search,
      },
    }
  );

  return response;
};

export const createContactLabel = async ({
  teamId,
  ...rest
}: CreateContactLabelVars): Promise<ContactLabel> => {
  const { data: response } = await axios.post(`/api/teams/${teamId}/contacts/labels`, { ...rest });
  return response;
};

export const updateContactLabel = async ({
  teamId,
  id,
  ...rest
}: UpdateContactLabelVars): Promise<ContactLabel> => {
  const { data: response } = await axios.patch(`/api/teams/${teamId}/contacts/labels/${id}`, {
    ...rest,
  });
  return response;
};

export const deleteContactLabel = async ({
  teamId,
  id,
}: DeleteContactLabelVars): Promise<ContactLabel> => {
  const { data: response } = await axios.delete(`/api/teams/${teamId}/contacts/labels/${id}`);
  return response;
};
