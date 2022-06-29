import { NotificationType } from '@prisma/client';
import { createHandler, Post } from '@storyofams/next-api-decorators';
import { differenceInCalendarDays } from 'date-fns';

import { NotificationEmailData } from 'types/notifications';
import { sendDynamicEmail } from 'backend/apiUtils/email';
import { daysBeforeNow } from 'backend/apiUtils/dates';
import { requiresServiceAccount } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { dayDifferenceToString, taskHeadingByType } from 'utils/tasks';
import { fetchPaidWorkspaceMembersToNotify } from 'utils/reminders';

const notificationTemplateId = 'd-1b8a97cb16f946ef8b1379f2a61a56a4';

@requiresServiceAccount()
class RemindersHandler {
  @Post()
  async runJob() {
    const workspaceMembersToNotify = await fetchPaidWorkspaceMembersToNotify();

    // for each workspace member, look for tasks that are due soon, and for free users,
    // that were due less than 7 days ago.
    const notificationsToPost = workspaceMembersToNotify
      .map(({ tasksAssigned, id, workspace }) => {
        return tasksAssigned
          .filter((task) => {
            return workspace.subscription ? true : task.dueDate >= daysBeforeNow(7);
          })
          .map((task) => ({
            type: NotificationType.TASK_OVERDUE,
            workspaceMemberId: id,
            taskId: task.id,
            extraData: {},
          }));
      })
      .flat();

    await prisma.notification.createMany({
      data: notificationsToPost,
      skipDuplicates: true,
    });

    let emailsSent = 0;
    workspaceMembersToNotify.forEach((member) => {
      if (!member.user.emailPreferences?.reminders) return; // skip users who have disable email notifications

      member.tasksAssigned.map(async (task) => {
        ++emailsSent;
        const dayDifference = differenceInCalendarDays(new Date(), new Date(task.dueDate));
        await sendDynamicEmail<NotificationEmailData>({
          to: member.user.email as string,
          templateId: notificationTemplateId,
          dynamicTemplateData: {
            workspaceName: member.workspace.name,
            ctaText: 'View Details',
            ctaUrl: `${process.env.NEXTAUTH_URL}/tasks/${task.id}`,
            manageUrl: `${process.env.NEXTAUTH_URL}/user/settings`,
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
      notificationsCreated: notificationsToPost.length,
      emailsSent,
    };
  }
}

export default createHandler(RemindersHandler);
