import axios from 'axios';
import { Track } from '@prisma/client';

import {
  ChangeTrackOrderVars,
  CopyTrackVars,
  CreateSingleTrackVars,
  DeleteSingleTrackVars,
  EditSingleTrackVars,
  TrackFilterOptions,
} from './types';

import { PaginatedQueryResult } from 'queries/types';
import { ClientRelease, TrackResponse } from 'types/common';

export const fetchWorkspaceTracks = async ({
  workspace,
  search,
}: TrackFilterOptions): Promise<PaginatedQueryResult<Track>> => {
  const { data } = await axios.get(`/api/tracks`, {
    params: {
      workspace,
      search,
      // sortBy: sorting?.key,
      // sortOrder: sorting?.order,
    },
  });

  return data;
};

export const copyTracksToRelease = async ({
  ids,
  releaseId,
}: CopyTrackVars): Promise<ClientRelease | void> => {
  if (!ids) return Promise.reject();

  const { data: response } = await axios.put(`/api/releases/${releaseId}/tracks`, {
    ids,
  });
  return response;
};

export const createReleaseTrack = async ({
  releaseId,
  ...rest
}: CreateSingleTrackVars): Promise<ClientRelease | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/tracks`, {
    ...rest,
  });
  return response;
};

export const changeReleaseTrackOrder = async ({
  releaseId,
  ...rest
}: ChangeTrackOrderVars): Promise<ClientRelease | void> => {
  const { data: response } = await axios.patch(`/api/releases/${releaseId}/tracks`, {
    ...rest,
  });
  return response;
};

export const editSingleTrack = async ({
  id,
  ...rest
}: EditSingleTrackVars): Promise<TrackResponse | void> => {
  const { data: response } = await axios.patch(`/api/tracks/${id}`, {
    ...rest,
  });
  return response;
};

export const deleteSingleTrack = async ({
  id,
}: DeleteSingleTrackVars): Promise<TrackResponse | void> => {
  const { data: response } = await axios.delete(`/api/tracks/${id}`);
  return response;
};
