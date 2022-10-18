import { createHandler, Req, NotFoundException, Patch, Body } from 'next-api-decorators';

import type { AuthDecoratedRequest } from 'types/auth';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { ensureUserHasWorkspaceMembership } from 'backend/apiUtils/workspaces';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { UpdateNotificationDto } from 'backend/models/notifications/update';

@requiresAuth()
class SpecificNotificationHandler {
  @Patch()
  async updateSingleNotification(
    @Req() req: AuthDecoratedRequest,
    @Body() body: UpdateNotificationDto,
    @PathParam('_nId') notificationId: string
  ) {
    if (!notificationId) {
      throw new NotFoundException();
    }

    const notification = await prisma.notification.findUnique({ where: { id: notificationId } });
    if (!notification) {
      throw new NotFoundException();
    }

    // ensure user is updating one of their own notifications
    await ensureUserHasWorkspaceMembership(req, notification.workspaceMemberId);

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
