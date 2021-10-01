import { createHandler, Get, Query } from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { getEventsForRelease } from 'backend/apiUtils/events';
import prisma from 'backend/prisma/client';
import { EnrichedRelease, EventType } from 'types';

@requiresAuth()
class ReleaseListHandler {
  @Get()
  async releaseEvents(
    @Query('team') team: string,
    @Query('assignee') assignee: string
  ) {
    const releases = await prisma.release.findMany({
      where: {
        AND: [
          { team: { id: team } },
          {
            OR: [
              { artwork: { assignees: { some: { id: assignee } } } },
              { distribution: { assignees: { some: { id: assignee } } } },
              { musicVideo: { assignees: { some: { id: assignee } } } },
              { mastering: { assignees: { some: { id: assignee } } } },
              { marketing: { assignees: { some: { id: assignee } } } },
            ],
          },
        ],
      },
      include: {
        artist: true,
        artwork: { include: { assignees: true } },
        distribution: { include: { assignees: true, distributor: true } },
        musicVideo: { include: { assignees: true } },
        mastering: { include: { assignees: true } },
        marketing: { include: { assignees: true } },
      },
    });

    return releases
      .map((item) => getEventsForRelease(item as EnrichedRelease, !assignee))
      .filter((item) =>
        assignee
          ? item.some((event) =>
              event.data.assignees.some(
                (taskAssignee) => taskAssignee.id === assignee
              )
            )
          : true
      )
      .flat();
  }
}

export default createHandler(ReleaseListHandler);
