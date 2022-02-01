import {
  createHandler,
  Req,
  NotFoundException,
  Patch,
  Body,
} from '@storyofams/next-api-decorators';

import { PathParam } from 'backend/apiUtils/decorators/routing';
import { AuthDecoratedRequest } from 'types/common';
import { ensureUserHasTeamMembership } from 'backend/apiUtils/teams';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { UpdateNotificationDto } from 'backend/models/notifications/update';

@requiresAuth()
class SpecificNotificationHandler {
  @Patch()
  async updateSingleNotification(
    @Req() req: AuthDecoratedRequest,
    @Body() body: UpdateNotificationDto,
    @PathParam('notificationId') notificationId: string
  ) {
    if (!notificationId) {
      throw new NotFoundException();
    }

    const notification = await prisma.notification.findUnique({ where: { id: notificationId } });
    if (!notification) {
      throw new NotFoundException();
    }

    // ensure user is updating one of their own notifications
    await ensureUserHasTeamMembership(req, notification.teamMemberId);

    const updatedNotification = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        ...body,
      },
    });
    return updatedNotification;
  }
}

export default createHandler(SpecificNotificationHandler);
