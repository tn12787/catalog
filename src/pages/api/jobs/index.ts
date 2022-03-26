import { createHandler, Post, UseMiddleware } from '@storyofams/next-api-decorators';

import { requiresServiceAccount } from 'backend/apiUtils/decorators/auth';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';

@requiresServiceAccount()
@UseMiddleware(PrivateApiLimiter(5))
class JobHandler {
  @Post()
  async runJob() {
    return {
      acknowledged: true,
    };
  }
}

export default createHandler(JobHandler);
