import axios from 'axios';
import { Track } from '@prisma/client';

import { CopyTrackVars, CreateSingleTrackVars, TrackFilterOptions } from './types';

import { PaginatedQueryResult } from 'queries/types';
import { ClientRelease } from 'types/common';

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
