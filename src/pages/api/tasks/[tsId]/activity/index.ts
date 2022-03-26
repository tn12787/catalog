import {
  createHandler,
  Get,
  NotFoundException,
  Req,
  UseMiddleware,
} from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
class SingleTaskHandler {
  @Get()
  async taskEvents(@Req() req: AuthDecoratedRequest, @PathParam('tsId') taskId: string) {
    if (!taskId) throw new NotFoundException();

    const task = await prisma.releaseTask.findUnique({
      where: { id: taskId },
      select: {
        release: { select: { workspaceId: true } },
      },
    });

    await checkRequiredPermissions(req, ['VIEW_RELEASES'], task?.release?.workspaceId);

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
