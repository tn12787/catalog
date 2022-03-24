import { NotFoundException } from '@storyofams/next-api-decorators';
import { AuthDecoratedRequest } from 'types/auth';

import { transformReleaseToApiShape } from 'backend/apiUtils/transforms/releases';
import { EnrichedRelease } from 'types/common';
import prisma from 'backend/prisma/client';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';

export const getArtistByIdIsomorphic = async (
  req: AuthDecoratedRequest,
  id: string | undefined
) => {
  if (!id) throw new NotFoundException();

  const artist = await prisma.artist.findUnique({
    where: {
      id,
    },
    include: {
      releases: {
        include: {
          tasks: {
            include: {
              artworkData: true,
              distributionData: { include: { distributor: true } },
              masteringData: true,
            },
          },
        },
      },
    },
  });

  await checkRequiredPermissions(req, ['VIEW_ARTISTS'], artist?.workspaceId);

  if (!artist) throw new NotFoundException();

  return {
    ...artist,
    releases: artist.releases.map((release) =>
      transformReleaseToApiShape(release as EnrichedRelease)
    ),
  };
};
