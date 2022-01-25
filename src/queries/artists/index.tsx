import axios from 'axios';
import { Artist } from '@prisma/client';

import { CreateSingleArtistVars, SingleArtistVars } from './types';

import { ClientRelease } from 'types/common';

export const fetchArtists = async (teamId: string): Promise<Artist[]> => {
  const { data } = await axios.get(`/api/artists`, {
    params: { team: teamId },
  });
  return data;
};

export const fetchSingleArtist = async (id: string) => {
  return await axios.get<Artist & { releases: ClientRelease[] }>(`/api/artists/${id}`);
};

export const createSingleArtist = async ({
  ...rest
}: CreateSingleArtistVars): Promise<Artist | void> => {
  const { data: response } = await axios.post(`/api/artists`, {
    ...rest,
  });
  return response;
};

export const updateSingleArtist = async ({
  id,
  ...rest
}: SingleArtistVars): Promise<Artist | void> => {
  if (!id) return Promise.reject();

  const { data: response } = await axios.put(`/api/artists/${id}`, {
    ...rest,
  });
  return response;
};

export const deleteSingleArtist = async (id: string): Promise<Artist | void> => {
  const { data: response } = await axios.delete(`/api/artists/${id}`);
  return response;
};
