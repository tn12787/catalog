import { TaskStatus } from '@prisma/client';
import { createHandler, Get } from '@storyofams/next-api-decorators';

// import { requiresServiceAccount } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';

// TODO: Reenable service account access
//@requiresServiceAccount()
class JobHandler {
  @Get() // TODO: Change back to post after testing
  async runJob() {
    // Here do something with prisma that finds tasks that are potentiall overdue or almost due and write a notification for them

    // Get all tasks with due date < today +2 and not completed yet
    // TaskStatus != COMPLETE

    const releasetasks = prisma.releaseTask.findMany({
      where: { 
        status: {
          not: TaskStatus.COMPLETE
        }
      }
    });

    return {
      acknowledged: true, 
      releasetasks 
    };
  }
}

export default createHandler(JobHandler);
