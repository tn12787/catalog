import { createHandler, Get, Query } from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { getEventsForRelease } from 'backend/apiUtils/events';
import prisma from 'backend/prisma/client';
import { EnrichedRelease } from 'types';

@requiresAuth()
class ReleaseListHandler {
  @Get()
  async releaseEvents(@Query('team') team: string, @Query('assignee') assignee: string) {
    const where = assignee
      ? {
          AND: [
            { team: { id: team } },
            {
              tasks: { some: { assignees: { some: { id: assignee } } } },
            },
          ],
        }
      : { team: { id: team } };
    const releases = await prisma.release.findMany({
      where,
      include: {
        artist: true,
        tasks: {
          include: {
            assignees: true,
            artworkData: true,
            distributionData: true,
            musicVideoData: true,
            masteringData: true,
            marketingData: true,
          },
        },
      },
    });

    return releases.map((item) => getEventsForRelease(item as EnrichedRelease, !assignee)).flat();
  }
}

export default createHandler(ReleaseListHandler);
