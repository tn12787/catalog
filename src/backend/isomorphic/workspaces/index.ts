import { NotFoundException } from '@storyofams/next-api-decorators';

import { EnrichedWorkspace } from 'types/common';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import prisma from 'backend/prisma/client';
import { AuthDecoratedRequest } from 'types/auth';

export const getWorkspaceByIdIsomorphic = async (
  req: AuthDecoratedRequest,
  id: string
): Promise<EnrichedWorkspace> => {
  await checkRequiredPermissions(req, ['VIEW_TEAM'], id);

  const workspace = await prisma.workspace.findUnique({
    where: { id },
    include: {
      members: { include: { roles: true, user: true } },
      invites: true,
      subscription: true,
    },
  });

  if (!workspace) {
    throw new NotFoundException();
  }

  return workspace;
};
