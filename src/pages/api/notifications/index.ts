import { createHandler, Get, Query, BadRequestException } from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';

@requiresAuth()
class NotificationHandler {
  @Get()
  async list(@Query('teamMemberId') teamMemberId: string) {
    if (!teamMemberId) {
      throw new BadRequestException('teamMemberId is required');
    }

    const notifications = await prisma.notification.findMany({
      where: {
        teamMemberId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return notifications;
  }
}

export default createHandler(NotificationHandler);
