import { NotFoundException } from '@storyofams/next-api-decorators';

import { transformReleaseToApiShape } from 'backend/apiUtils/transforms/releases';
import { AuthDecoratedRequest } from 'types/common';
import prisma from 'backend/prisma/client';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';

export const getReleaseByIdIsomorphic = async (
  req: AuthDecoratedRequest,
  id: string | undefined
) => {
  if (!id) throw new NotFoundException();

  const releaseWorkspace = await prisma.release.findUnique({
    where: { id },
    select: {
      workspaceId: true,
    },
  });

  await checkRequiredPermissions(req, ['VIEW_RELEASES'], releaseWorkspace?.workspaceId);

  const release = await prisma.release.findUnique({
    where: {
      id,
    },
    include: {
      artist: true,
      tasks: {
        include: {
          assignees: { include: { user: true } },
          contacts: { include: { labels: true } },
          artworkData: true,
          distributionData: { include: { distributor: true } },
          masteringData: true,
        },
      },
    },
  });

  if (!release) throw new NotFoundException();

  return transformReleaseToApiShape(release);
};
