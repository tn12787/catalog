import { pick, isNil, pickBy } from 'lodash';

import { transformArtistToPrismaQuery } from './../transforms/artists';
import { UpdateReleaseDto } from './../../models/releases/update';

export const buildUpdateReleaseArgs = (body: UpdateReleaseDto) => {
  const baseArgs = pickBy(
    {
      ...pick(body, ['type', 'name']),
      artist: transformArtistToPrismaQuery(body.artist),
      targetDate: body.targetDate ? new Date(body.targetDate) : undefined,
    },
    (v) => !isNil(v)
  );

  return { ...baseArgs };
};
