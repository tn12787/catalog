import { TaskStatus, ReleaseTaskType, Release } from '@prisma/client';

export enum EventType {
  ARTWORK = 'artwork',
  DISTRIBUTION = 'distribution',
  MARKETING = 'marketing',
  MASTERING = 'mastering',
  MUSIC_VIDEO = 'musicVideo',
  RELEASE = 'release',
}

export interface BaseEvent {
  date: string;
  name: string;
  data: { status: TaskStatus; type: ReleaseTaskType };
  release: Release;
}
