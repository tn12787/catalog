import {
  createHandler,
  Get,
  NotFoundException,
  UseMiddleware,
} from '@storyofams/next-api-decorators';

import { getEventsForRelease } from 'backend/apiUtils/events';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import prisma from 'backend/prisma/client';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
class SpecificReleaseEventsHandler {
  @Get()
  async specificReleaseEvents(@PathParam('releaseId') id: string) {
    const release = await prisma.release.findUnique({
      where: { id },
      include: {
        artist: true,
        tasks: {
          include: {
            assignees: { include: { user: true } },
            contacts: { include: { labels: true } },
            artworkData: true,
            distributionData: true,
            masteringData: true,
          },
        },
      },
    });

    if (!release) throw new NotFoundException();

    return getEventsForRelease(release);
  }
}

export default createHandler(SpecificReleaseEventsHandler);
