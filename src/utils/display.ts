import { ReleaseTaskType } from '@prisma/client';

export const releaseTaskTypeToDisplayName = (type: ReleaseTaskType) => {
  switch (type) {
    case ReleaseTaskType.ARTWORK:
      return 'Artwork';
    case ReleaseTaskType.DISTRIBUTION:
      return 'Distribution';
    case ReleaseTaskType.GENERIC:
      return 'Generic';
    case ReleaseTaskType.MASTERING:
      return 'Mastering';
    case ReleaseTaskType.MUSIC_VIDEO:
      return 'Music Video';
    default:
      return '';
  }
};
