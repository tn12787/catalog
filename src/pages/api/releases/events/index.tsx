import { createHandler, Get, Query } from '@storyofams/next-api-decorators';

import requiresAuth from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { EventType } from 'types';

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
      .map((release) =>
        [
          {
            name: release.name,
            date: release.targetDate,
            type: EventType.RELEASE,
            release: release,
            data: release,
          },
          release.artwork && {
            name: `${release.name}: artwork`,
            date: release.artwork.dueDate,
            type: EventType.ARTWORK,
            data: release.artwork,
            release,
          },
          release.distribution && {
            name: `${release.name}: distribution`,
            date: release.distribution.dueDate,
            type: EventType.DISTRIBUTION,
            data: release.distribution,
            release,
          },
          release.musicVideo && {
            name: `${release.name}: musicVideo`,
            date: release.musicVideo.dueDate,
            type: EventType.MUSIC_VIDEO,
            data: release.musicVideo,
            release,
          },
          release.mastering && {
            name: `${release.name}: mastering`,
            date: release.mastering.dueDate,
            type: EventType.MASTERING,
            data: release.mastering,
            release,
          },
          release.marketing && {
            name: `${release.name}: marketing`,
            date: release.marketing.dueDate,
            type: EventType.MARKETING,
            data: release.marketing,
            release,
          },
        ].filter(Boolean)
      )
      .flat();
  }
}

export default createHandler(ReleaseListHandler);
