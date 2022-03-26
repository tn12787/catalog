import { createHandler, Get, Query, UseMiddleware } from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { getEventsForRelease } from 'backend/apiUtils/events';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';
import prisma from 'backend/prisma/client';
import { EnrichedRelease } from 'types/common';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
class ReleaseListHandler {
  @Get()
  async releaseEvents(@Query('workspace') workspace: string, @Query('assignee') assignee: string) {
    const where = assignee
      ? {
          AND: [
            { workspace: { id: workspace } },
            {
              tasks: { some: { assignees: { some: { id: assignee } } } },
            },
          ],
        }
      : { workspace: { id: workspace } };

    const releases = await prisma.release.findMany({
      where,
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

    return releases
      .map((item) => getEventsForRelease(item as EnrichedRelease, !assignee))
      .flat()
      .filter((item) => {
        if (!assignee) return true;

        return item.data.assignees?.some((taskAssignee) => taskAssignee.id === assignee);
      });
  }
}

export default createHandler(ReleaseListHandler);
