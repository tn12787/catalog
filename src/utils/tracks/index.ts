import { NotFoundException } from 'next-api-decorators';
import { Track } from '@prisma/client';

export const computeNewTrackOrdering = (tracks: Track[], id: string, newIndex: number): Track[] => {
  const oldIndex = tracks.findIndex((track) => track.id === id);

  if (oldIndex === -1) {
    throw new NotFoundException('The track you are trying to move does not exist');
  }

  const track = tracks[oldIndex];
  tracks.splice(oldIndex, 1);
  tracks.splice(newIndex, 0, track);

  return tracks.map((track, index) => ({ ...track, index }));
};
