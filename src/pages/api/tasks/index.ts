import { pickBy } from 'lodash';
import { Release } from '@prisma/client';
import { createHandler, DefaultValuePipe, Get, Query, Req } from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/auth';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { ArtistResponse } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { SortOrder } from 'queries/types';
import { RequiredQuery } from 'backend/apiUtils/decorators/routing';

@requiresAuth()
class TaskHandler {
  @Get()
  async tasks(
    @Req() req: AuthDecoratedRequest,
    @RequiredQuery('workspace') workspaceId: string,
    @Query('assignee') assigneeId: string,
    @Query('search') search: string,
    @Query('sortBy', DefaultValuePipe<keyof Release>('name')) sortBy: keyof ArtistResponse,
    @Query('sortOrder', DefaultValuePipe(SortOrder.ASC)) sortOrder: SortOrder
  ) {
    await checkRequiredPermissions(req, ['VIEW_RELEASES'], workspaceId);

    const orderBy = {
      [sortBy]: sortOrder,
    };

    const where = pickBy(
      {
        release: {
          workspace: { id: workspaceId },
        },
        assignees: assigneeId ? { some: { id: assigneeId } } : undefined,
        name: { contains: search, mode: 'insensitive' } as any,
      },
      Boolean
    );

    const tasks = await prisma.releaseTask.findMany({
      where,
      orderBy,
      include: {
        release: true,
        assignees: { include: { user: true } },
      },
    });
    return tasks;
  }
}

export default createHandler(TaskHandler);
