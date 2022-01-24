import { ReleaseTaskType } from '@prisma/client';

export const taskHeadingByType = (type: ReleaseTaskType, releaseName?: string) => {
  const releasePrefix = releaseName ? `${releaseName}: ` : '';
  switch (type) {
    case ReleaseTaskType.ARTWORK:
      return `${releasePrefix}🎨 Artwork`;
    case ReleaseTaskType.DISTRIBUTION:
      return `${releasePrefix}📦 Distribution`;
    case ReleaseTaskType.MASTERING:
      return `${releasePrefix}🎧 Mastering`;
    case ReleaseTaskType.MUSIC_VIDEO:
      return `${releasePrefix}🎥 Music Video`;
    case ReleaseTaskType.MARKETING:
      return `${releasePrefix}📷 Marketing`;
    default:
      return `${releasePrefix}🚩 Release Day`;
  }
};
