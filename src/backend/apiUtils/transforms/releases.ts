import { ReleaseTaskType } from '@prisma/client';
import { omit } from 'lodash';

import { EnrichedRelease, ClientRelease, EnrichedReleaseTask } from 'types/common';

export const transformReleaseToApiShape = (release: EnrichedRelease): ClientRelease => {
  const baseData = omit(release, ['tasks']);

  return {
    ...baseData,
    artwork: flattenField(release, ReleaseTaskType.ARTWORK) as ClientRelease['artwork'],
    distribution: flattenField(
      release,
      ReleaseTaskType.DISTRIBUTION
    ) as ClientRelease['distribution'],
    marketing: flattenField(release, ReleaseTaskType.MARKETING) as ClientRelease['marketing'],
    mastering: flattenField(release, ReleaseTaskType.MASTERING) as ClientRelease['mastering'],
    musicVideo: flattenField(release, ReleaseTaskType.MUSIC_VIDEO) as ClientRelease['musicVideo'],
  };
};

export const flattenField = (release: EnrichedRelease, type: ReleaseTaskType) => {
  const task = release.tasks.find(({ type: taskType }) => taskType === type);
  switch (type) {
    case ReleaseTaskType.ARTWORK:
      return flattenArtworkData(task);
    case ReleaseTaskType.DISTRIBUTION:
      return flattenDistributionData(task);
    case ReleaseTaskType.MARKETING:
      return flattenMarketingData(task);
    case ReleaseTaskType.MASTERING:
      return flattenMasteringData(task);
    case ReleaseTaskType.MUSIC_VIDEO:
      return flattenMusicVideoData(task);
    default:
      throw new Error(`Unknown release task type: ${type}`);
  }
};

export const stripDbFields = (task: EnrichedReleaseTask) => {
  return omit(task, [
    'artworkData',
    'distributionData',
    'masteringData',
    'marketingData',
    'musicVideoData',
  ]);
};

export const flattenArtworkData = (task?: EnrichedReleaseTask): ClientRelease['artwork'] => {
  if (!task?.artworkData || task.type !== ReleaseTaskType.ARTWORK) {
    return undefined;
  }

  return {
    ...stripDbFields(task),
    url: task.artworkData?.url,
  };
};

export const flattenDistributionData = (
  task?: EnrichedReleaseTask
): ClientRelease['distribution'] => {
  if (!task?.distributionData || task.type !== ReleaseTaskType.DISTRIBUTION) {
    return undefined;
  }

  return {
    ...stripDbFields(task),
    distributorId: task.distributionData?.distributorId,
    distributor: task.distributionData?.distributor,
  };
};

export const flattenMasteringData = (task?: EnrichedReleaseTask): ClientRelease['mastering'] => {
  if (!task?.masteringData || task.type !== ReleaseTaskType.MASTERING) {
    return undefined;
  }

  return {
    ...stripDbFields(task),
    url: task.masteringData?.url,
  };
};

export const flattenMusicVideoData = (task?: EnrichedReleaseTask): ClientRelease['musicVideo'] => {
  if (!task?.musicVideoData || task.type !== ReleaseTaskType.MUSIC_VIDEO) {
    return undefined;
  }

  return {
    ...stripDbFields(task),
    url: task.musicVideoData?.url,
  };
};

export const flattenMarketingData = (task?: EnrichedReleaseTask): ClientRelease['marketing'] => {
  if (!task?.marketingData || task.type !== ReleaseTaskType.MARKETING) {
    return undefined;
  }

  return {
    ...stripDbFields(task),
    links: task.marketingData?.links ?? [],
  };
};
