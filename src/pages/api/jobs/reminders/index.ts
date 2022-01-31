import { NotificationType, TaskStatus } from '@prisma/client';
import { createHandler, Post } from '@storyofams/next-api-decorators';

import { daysFromNow } from 'backend/apiUtils/dates';
import { requiresServiceAccount } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';

@requiresServiceAccount()
class RemindersHandler {
  @Post()
  async runJob() {
    const tasksAreOutstanding = {
      AND: {
        status: { not: TaskStatus.COMPLETE },
        dueDate: { lte: daysFromNow(2) },
      },
    };

    const teamMembersToNotify = await prisma.teamMember.findMany({
      where: {
        tasksAssigned: {
          some: tasksAreOutstanding,
        },
      },
      include: {
        user: true,
        tasksAssigned: {
          where: tasksAreOutstanding,
          select: {
            id: true,
            type: true,
            release: { select: { name: true } },
            status: true,
            dueDate: true,
          },
        },
      },
    });

    const notificationsToPost = teamMembersToNotify.map(({ id, tasksAssigned }) => {
      return {
        type: NotificationType.TASKS_OVERDUE,
        teamMemberId: id,
        extraData: { tasks: tasksAssigned.map((item) => item.id) },
      };
    });

    await prisma.notification.createMany({
      data: notificationsToPost,
      skipDuplicates: true,
    });

    return {
      acknowledged: true,
      created: notificationsToPost.length,
    };
  }
}

export default createHandler(RemindersHandler);
