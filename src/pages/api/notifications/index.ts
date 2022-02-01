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
} from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/common';
import {
  ensureUserHasTeamMembership,
  ensureUserHasTeamMembershipSync,
} from 'backend/apiUtils/teams';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { RequiredQuery } from 'backend/apiUtils/decorators/routing';
import { BatchUpdateNotificationDto } from 'backend/models/notifications/batchUpdate';

@requiresAuth()
class NotificationHandler {
  @Get()
  async list(
    @Req() req: AuthDecoratedRequest,
    @RequiredQuery('teamMemberId') teamMemberId: string,
    @Query('pageSize', DefaultValuePipe(10), ParseNumberPipe) pageSize: number,
    @Query('page', DefaultValuePipe(1), ParseNumberPipe) page: number,
    @Query('read', ParseBooleanPipe({ nullable: true })) read: boolean
  ) {
    // ensure user getting notifications belongs to the team for which they're asking
    await ensureUserHasTeamMembership(req, teamMemberId);

    const commonArgs = {
      where: pickBy(
        {
          teamMemberId,
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
      }),
      prisma.notification.count(commonArgs),
    ]);
    return { total: count, results: notifications };
  }

  @Patch()
  async bulkUpdate(@Req() req: AuthDecoratedRequest, @Body() body: BatchUpdateNotificationDto) {
    // ensure user getting notifications belongs to the team for which they're asking

    const ids = body.ids;

    if (!body.ids) throw new BadRequestException('No ids provided');

    const allNotifications = await prisma.notification.findMany({
      where: {
        id: { in: ids },
      },
    });

    allNotifications.forEach((item) =>
      ensureUserHasTeamMembershipSync(req.session, item.teamMemberId)
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
