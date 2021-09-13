import { createHandler, Get, Query } from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { getEventsForRelease } from 'backend/apiUtils/events';
import prisma from 'backend/prisma/client';
import { EnrichedRelease, EventType } from 'types';

@requiresAuth()
class ReleaseListHandler {
  @Get()
  async releaseEvents(@Query('team') team: string) {
    const releases = await prisma.release.findMany({
      where: { team: { id: team } },
      include: {
        artist: true,
        artwork: { include: { assignee: true } },
        distribution: { include: { assignee: true, distributor: true } },
        musicVideo: { include: { assignee: true } },
        mastering: { include: { assignee: true } },
        marketing: { include: { assignee: true } },
      },
    });

    return releases
      .map((item) => getEventsForRelease(item as EnrichedRelease))
      .flat();
  }
}

export default createHandler(ReleaseListHandler);
