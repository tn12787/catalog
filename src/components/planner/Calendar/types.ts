import { TaskStatus, ReleaseTaskType, Release } from '@prisma/client';

export enum EventType {
  ARTWORK = 'artwork',
  DISTRIBUTION = 'distribution',
  MASTERING = 'mastering',
  GENERIC = 'generic',
  RELEASE = 'release',
}

export interface BaseEvent {
  date: string;
  name: string;
  data: { status: TaskStatus; type: ReleaseTaskType };
  release: Release;
}
