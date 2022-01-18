import { NotFoundException } from '@storyofams/next-api-decorators';

import { checkRequiredPermissions } from '../teams';

import { AuthDecoratedRequest } from 'types';
import prisma from 'backend/prisma/client';

export const checkTaskUpdatePermissions = async (req: AuthDecoratedRequest, id: string) => {
  if (!id) throw new NotFoundException();

  const releaseTeam = await prisma.release.findUnique({
    where: { id },
    select: {
      teamId: true,
      targetDate: true,
    },
  });

  await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);
};
