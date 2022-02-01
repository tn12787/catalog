import { createHandler, Req, Patch, Body, Delete } from '@storyofams/next-api-decorators';

import { RequiredQuery } from 'backend/apiUtils/decorators/routing';
import { AuthDecoratedRequest } from 'types/common';
import { ensureUserHasTeamMembership } from 'backend/apiUtils/teams';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { UpdateNotificationDto } from 'backend/models/notifications/update';

@requiresAuth()
class AllNotificationsHandler {
  @Patch()
  async updateAllNotifications(
    @Req() req: AuthDecoratedRequest,
    @Body() body: UpdateNotificationDto
  ) {
    const teamMemberId = body.teamMemberId;
    // ensure user is updating one of their own notifications
    await ensureUserHasTeamMembership(req, teamMemberId);

    const updatedNotification = await prisma.notification.updateMany({
      where: {
        teamMemberId,
      },
      data: {
        ...body,
      },
    });

    return updatedNotification;
  }

  @Delete()
  async deleteAllNotifications(
    @Req() req: AuthDecoratedRequest,
    @RequiredQuery('teamMemberId') teamMemberId: string
  ) {
    // ensure user is updating one of their own notifications
    await ensureUserHasTeamMembership(req, teamMemberId);

    const updatedNotification = await prisma.notification.deleteMany({
      where: {
        teamMemberId,
      },
    });

    return updatedNotification;
  }
}

export default createHandler(AllNotificationsHandler);
