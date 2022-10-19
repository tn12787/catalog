import axios from 'axios';

import { LinkTrackVars, CreateSingleTrackVars } from './types';

import { ClientRelease } from 'types/common';

export const linkTracksToRelease = async ({
  ids,
  releaseId,
}: LinkTrackVars): Promise<ClientRelease | void> => {
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
