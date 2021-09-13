import {
  createHandler,
  Get,
  Query,
  NotFoundException,
} from '@storyofams/next-api-decorators';

import { EnrichedRelease } from 'types';
import { getEventsForRelease } from 'backend/apiUtils/events';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import prisma from 'backend/prisma/client';

@requiresAuth()
class SpecificReleaseEventsHandler {
  @Get()
  async specificReleaseEvents(@PathParam('id') id: string) {
    const release = await prisma.release.findUnique({
      where: { id },
      include: {
        artist: true,
        artwork: { include: { assignee: true } },
        distribution: { include: { assignee: true, distributor: true } },
        musicVideo: { include: { assignee: true } },
        mastering: { include: { assignee: true } },
        marketing: { include: { assignee: true } },
      },
    });

    if (!release) throw new NotFoundException();

    return getEventsForRelease(release as EnrichedRelease);
  }
}

export default createHandler(SpecificReleaseEventsHandler);
