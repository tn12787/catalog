import { createHandler, Post } from 'next-api-decorators';

import { requiresServiceAccount } from 'backend/apiUtils/decorators/auth';

@requiresServiceAccount()
class JobHandler {
  @Post()
  async runJob() {
    return {
      acknowledged: true,
    };
  }
}

export default createHandler(JobHandler);
