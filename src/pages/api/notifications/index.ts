import {
  createHandler,
  Get,
  Query,
  BadRequestException,
  Req,
  NotFoundException,
  DefaultValuePipe,
  ParseNumberPipe,
} from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/common';
import { ensureUserHasTeamMembership } from 'backend/apiUtils/teams';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { RequiredQuery } from 'backend/apiUtils/decorators/routing';

@requiresAuth()
class NotificationHandler {
  @Get()
  async list(
    @Req() req: AuthDecoratedRequest,
    @RequiredQuery('teamMemberId') teamMemberId: string,
    @Query('pageSize', DefaultValuePipe(10), ParseNumberPipe) pageSize: number,
    @Query('page', DefaultValuePipe(1), ParseNumberPipe) page: number
  ) {
    // ensure user getting notifications belongs to the team for which they're asking
    await ensureUserHasTeamMembership(req, teamMemberId);

    const commonArgs = {
      where: {
        teamMemberId,
      },
    };

    const [notifications, count] = await prisma.$transaction([
      prisma.notification.findMany({
        ...commonArgs,
        skip: pageSize * (page - 1),
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.notification.count(commonArgs),
    ]);
    return { total: count, results: notifications };
  }
}

export default createHandler(NotificationHandler);
