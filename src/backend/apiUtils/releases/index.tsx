import { Release, ReleaseTask, ReleaseTaskType } from '@prisma/client';
import {
  Artist,
  Artwork,
  Distribution,
  EnrichedRelease,
  Mastering,
  MusicVideo,
} from 'types';

export const releaseDataModelToEnrichedRelease = (
  release: Release & { tasks: ReleaseTask[]; artist: Artist }
): EnrichedRelease => {
  const { tasks, ...rest } = release;

  return {
    ...rest,
    artwork: tasks.find(
      (task) => task.type === ReleaseTaskType.ARTWORK
    ) as Artwork,
    mastering: tasks.find(
      (task) => task.type === ReleaseTaskType.MASTERING
    ) as Mastering,
    distribution: tasks.find(
      (task) => task.type === ReleaseTaskType.DISTRIBUTION
    ) as Distribution,
    musicVideo: tasks.find(
      (task) => task.type === ReleaseTaskType.MUSIC_VIDEO
    ) as MusicVideo,
  } as EnrichedRelease;
};
