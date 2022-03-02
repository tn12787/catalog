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

    const workspaceMembersToNotify = await prisma.workspaceMember.findMany({
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

    const notificationsToPost = workspaceMembersToNotify
      .map(({ id, tasksAssigned }) => {
        return tasksAssigned
          .filter((item) => item.dueDate ?? new Date() < new Date())
          .map((task) => ({
            type: NotificationType.TASK_OVERDUE,
            workspaceMemberId: id,
            taskId: task.id,
            extraData: {},
          }));
      })
      .flat(1);

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
