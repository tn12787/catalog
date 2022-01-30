import { TaskStatus } from '@prisma/client';
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
  @Get() // TODO: Change back to post after testing
  async runJob() {
    // Here do something with prisma that finds tasks that are potentiall overdue or almost due and write a notification for them

    // Get all tasks with due date < today +2 and not completed yet

    // TaskStatus != COMPLETE

    const releasetasks = await prisma.releaseTask.findMany({
      where: {
        AND: {
          // TODO: Why  { not: 'COMPLETE' } failing?
          // TODO: Can we use types rather than strings?
          status: { in: ['OUTSTANDING', 'IN_PROGRESS'] },
          dueDate: { lte: daysFromNow(2) },
        },
      },
      include: {
        assignees: true,
      },
    });

    // Unique users with overdue/upcoming (Alertable) tasks
    const usersWithAlertableTasks = new Set(releasetasks.flatMap((task) => task.assignees));

    return {
      acknowledged: true,
      releasetasks,
      // Why can't this handle sets?
      usersWithAlertableTasks: Array.from(usersWithAlertableTasks.values()),
    };
  }
}

export default createHandler(JobHandler);
