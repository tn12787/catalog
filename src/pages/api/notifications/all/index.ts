import { createHandler, Req, Patch, Body, Delete } from 'next-api-decorators';

import type { AuthDecoratedRequest } from 'types/auth';
import { RequiredQuery } from 'backend/apiUtils/decorators/routing';
import { ensureUserHasWorkspaceMembership } from 'backend/apiUtils/workspaces';
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
    const workspaceMemberId = body.workspaceMemberId;
    // ensure user is updating one of their own notifications
    await ensureUserHasWorkspaceMembership(req, workspaceMemberId);

    const updatedNotification = await prisma.notification.updateMany({
      where: {
        workspaceMemberId,
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
    @RequiredQuery('workspaceMemberId') workspaceMemberId: string
  ) {
    // ensure user is updating one of their own notifications
    await ensureUserHasWorkspaceMembership(req, workspaceMemberId);

    const updatedNotification = await prisma.notification.deleteMany({
      where: {
        workspaceMemberId,
      },
    });

    return updatedNotification;
  }
}

export default createHandler(AllNotificationsHandler);
