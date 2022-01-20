import { createHandler, Get, NotFoundException, Req } from '@storyofams/next-api-decorators';
import { NextApiRequest } from 'next';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';

@requiresAuth()
class SingleTaskHandler {
  @Get()
  async taskEvents(@Req() req: NextApiRequest, @PathParam('id') taskId: string) {
    if (!taskId) throw new NotFoundException();

    const task = await prisma.releaseTask.findUnique({
      where: { id: taskId },
      select: {
        release: { select: { teamId: true } },
      },
    });

    await checkRequiredPermissions(req, ['VIEW_RELEASES'], task?.release?.teamId);

    const activity = await prisma.releaseTaskEvent.findMany({
      where: {
        taskId: taskId,
      },
      orderBy: {
        timestamp: 'asc',
      },
      include: {
        user: { include: { user: true } },
      },
    });

    if (!activity) throw new NotFoundException();

    return activity;
  }
}

export default createHandler(SingleTaskHandler);
