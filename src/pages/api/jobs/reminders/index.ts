import { NotificationType, TaskStatus } from '@prisma/client';
import { createHandler, Post } from '@storyofams/next-api-decorators';
import { differenceInCalendarDays } from 'date-fns';

import { NotificationEmailData } from './../../../../types/notifications/index';

import { sendDynamicEmail } from 'backend/apiUtils/email';
import { daysFromNow } from 'backend/apiUtils/dates';
import { requiresServiceAccount } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { dayDifferenceToString, taskHeadingByType } from 'utils/tasks';

const notificationTemplateId = 'd-1b8a97cb16f946ef8b1379f2a61a56a4';

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
        workspace: true,
        tasksAssigned: {
          where: tasksAreOutstanding,
          select: {
            id: true,
            type: true,
            name: true,
            release: { select: { name: true } },
            status: true,
            dueDate: true,
          },
        },
      },
    });

    const distilledNotifications = workspaceMembersToNotify.map(
      ({ tasksAssigned, id, ...rest }) => {
        return {
          ...rest,
          notifications: tasksAssigned.map((tasks) => ({
            type: NotificationType.TASK_OVERDUE,
            workspaceMemberId: id,
            taskId: tasks.id,
            extraData: {},
          })),
        };
      }
    );

    const notificationsToPost = distilledNotifications.map((item) => item.notifications).flat(1);

    await prisma.notification.createMany({
      data: notificationsToPost,
      skipDuplicates: true,
    });

    workspaceMembersToNotify.forEach((member) => {
      member.tasksAssigned.map(async (task) => {
        const dayDifference = differenceInCalendarDays(new Date(), new Date(task.dueDate));

        await sendDynamicEmail<NotificationEmailData>({
          to: member.user.email as string,
          templateId: notificationTemplateId,
          dynamicTemplateData: {
            workspaceName: member.workspace.name,
            ctaText: 'View Details',
            ctaUrl: `${process.env.NEXTAUTH_URL}/tasks/${task.id}`,
            manageUrl: `${process.env.NEXTAUTH_URL}/workspaces/${member.workspace.id}/settings`,
            title: `${taskHeadingByType(
              task.name,
              task.type,
              task.release.name
            )} is ${dayDifferenceToString(dayDifference)}.`,
            message: `Click the link below to view this task and update its status or due date if needed.`,
          },
        });
      });
    });

    return {
      acknowledged: true,
      created: notificationsToPost.length,
    };
  }
}

export default createHandler(RemindersHandler);
