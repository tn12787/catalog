import { NotificationType, TaskStatus } from '@prisma/client';
import { createHandler, Get } from '@storyofams/next-api-decorators';

// import { requiresServiceAccount } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';

const daysFromNow = (days: number) => {
  const nowTime = new Date().getTime();
  const daysInMillis = days * 24 * 60 * 60 * 1000;
  return new Date(nowTime + daysInMillis);
};

// TODO: Reenable service account access
//@requiresServiceAccount()
class JobHandler {
  // TODO: Change back to post after testing
  // @Post()
  @Get()
  async runJob() {
    const tasksAreOutstanding = {
      AND: {
        status: { not: TaskStatus.COMPLETE },
        dueDate: { lte: daysFromNow(2) },
      },
    };

    const teamMemberToNotify = await prisma.teamMember.findMany({
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

    const notificationsToPost = teamMemberToNotify.map(({ id, tasksAssigned }) => {
      return {
        type: NotificationType.TASKS_OVERDUE,
        // TODO: This userId is a bit confusing - is it userId or teamMember.id?
        userId: id,
        extraData: { tasks: tasksAssigned.map((item) => item.id) },
      };
    });

    // // Find all users with overdue/upcoming (Alertable) tasks
    // const notificationsToPost = releasetasks
    //   .flatMap((task) => task.assignees)
    //   .map((assignee) => ({
    //     type: NotificationType.TASKS_OVERDUE,
    //     // TODO: This userId is a bit confusing - is it userId or teamMember.id?
    //     userId: assignee.id,
    //     // TODO: What are we going to use the extra data for?
    //     extraData: { message: 'What to put here?' },
    //   }));

    // Create the notifications that users have tasks due/overdue
    await prisma.notification.createMany({
      data: notificationsToPost,
      skipDuplicates: true,
    });

    return {
      acknowledged: true,
      notificationsToPost: notificationsToPost,
    };
  }
}

export default createHandler(JobHandler);
