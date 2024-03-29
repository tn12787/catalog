import { NotFoundException } from 'next-api-decorators';

import type { AuthDecoratedRequest } from 'types/auth';
import prisma from 'backend/prisma/client';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';

export const getTaskByIdIsomorphic = async (req: AuthDecoratedRequest, id: string | undefined) => {
  if (!id) throw new NotFoundException();

  const task = await prisma.releaseTask.findUnique({
    where: { id },
    select: {
      release: true,
      type: true,
      assignees: { include: { user: true } },
      dueDate: true,
      id: true,
      status: true,
      name: true,
      updatedAt: true,
      distributionData: { include: { distributor: true } },
      masteringData: true,
      artworkData: true,
      notes: true,
      contacts: true,
    },
  });

  await checkRequiredPermissions(req, ['VIEW_RELEASES'], task?.release?.workspaceId);

  return task;
};
