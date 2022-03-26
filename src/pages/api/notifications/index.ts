import { pickBy } from 'lodash';
import {
  createHandler,
  Get,
  Query,
  Req,
  DefaultValuePipe,
  ParseNumberPipe,
  ParseBooleanPipe,
  Body,
  Patch,
  BadRequestException,
  UseMiddleware,
} from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/auth';
import {
  ensureUserHasWorkspaceMembership,
  ensureUserHasWorkspaceMembershipSync,
} from 'backend/apiUtils/workspaces';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { RequiredQuery } from 'backend/apiUtils/decorators/routing';
import { BatchUpdateNotificationDto } from 'backend/models/notifications/batchUpdate';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
class NotificationHandler {
  @Get()
  async list(
    @Req() req: AuthDecoratedRequest,
    @RequiredQuery('workspaceMemberId') workspaceMemberId: string,
    @Query('pageSize', DefaultValuePipe(10), ParseNumberPipe) pageSize: number,
    @Query('page', DefaultValuePipe(1), ParseNumberPipe) page: number,
    @Query('read', ParseBooleanPipe({ nullable: true })) read: boolean
  ) {
    // ensure user getting notifications belongs to the workspace for which they're asking
    await ensureUserHasWorkspaceMembership(req, workspaceMemberId);

    const commonArgs = {
      where: pickBy(
        {
          workspaceMemberId,
          read,
        },
        (v) => v !== undefined
      ),
    };

    const [notifications, count] = await prisma.$transaction([
      prisma.notification.findMany({
        ...commonArgs,
        skip: pageSize * (page - 1),
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          task: { include: { release: true } },
          actor: { include: { user: true } },
        },
      }),
      prisma.notification.count(commonArgs),
    ]);
    return { total: count, results: notifications };
  }

  @Patch()
  async bulkUpdate(@Req() req: AuthDecoratedRequest, @Body() body: BatchUpdateNotificationDto) {
    // ensure user getting notifications belongs to the workspace for which they're asking

    const ids = body.ids;

    if (!body.ids) throw new BadRequestException('No ids provided');

    const allNotifications = await prisma.notification.findMany({
      where: {
        id: { in: ids },
      },
    });

    allNotifications.forEach((item) =>
      ensureUserHasWorkspaceMembershipSync(req.session, item.workspaceMemberId)
    );

    const newNotifs = await prisma.notification.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        read: body.read,
      },
    });

    return newNotifs;
  }
}

export default createHandler(NotificationHandler);
