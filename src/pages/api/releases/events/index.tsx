import { createHandler, Get } from '@storyofams/next-api-decorators';

import requiresAuth from 'backend/apiUtils/auth';
import prisma from 'backend/prisma/client';

@requiresAuth()
class ReleaseListHandler {
  @Get()
  async releaseEvents() {
    const releases = await prisma.release.findMany({
      include: {
        artist: true,
        artwork: { include: { assignee: true } },
        distribution: { include: { assignee: true } },
        musicVideo: { include: { assignee: true } },
        mastering: { include: { assignee: true } },
        marketing: { include: { assignee: true } },
      },
    });

    return releases
      .map((release) =>
        [
          { name: release.name, date: release.targetDate, release: release },
          release.artwork && {
            name: `${release.name}: artwork`,
            date: release.artwork.dueDate,
            release,
          },
          release.distribution && {
            name: `${release.name}: distribution`,
            date: release.distribution.dueDate,
            release,
          },
          release.musicVideo && {
            name: `${release.name}: musicVideo`,
            date: release.musicVideo.dueDate,
            release,
          },
          release.mastering && {
            name: `${release.name}: mastering`,
            date: release.mastering.dueDate,
            release,
          },
          release.marketing && {
            name: `${release.name}: marketing`,
            date: release.marketing.dueDate,
            release,
          },
        ].filter(Boolean)
      )
      .flat();
  }
}

export default createHandler(ReleaseListHandler);
