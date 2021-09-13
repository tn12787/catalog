import { EnrichedRelease, EventType } from 'types';

export const getEventsForRelease = (release: EnrichedRelease) => {
  return [
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
  ]
    .filter(Boolean)
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
};
