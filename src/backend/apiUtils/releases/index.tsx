import { Release, ReleaseTask, ReleaseTaskType } from '@prisma/client';
import { Artwork, EnrichedRelease } from 'types';

export const releaseDataModelToEnrichedRelease = (
  release: Release & { tasks: ReleaseTask[] }
): EnrichedRelease => {
  const { tasks, ...rest } = release;

  return {
    ...rest,
    artwork: tasks.find((task) => task.type === ReleaseTaskType.ARTWORK) as Artwork,
    mastering: tasks.find((task) => task.type === ReleaseTaskType.MASTERING),
    distribution: tasks.find(
      (task) => task.type === ReleaseTaskType.DISTRIBUTION
    ),
    musicVideo: tasks.find((task) => task.type === ReleaseTaskType.MUSIC_VIDEO),
  };
};
