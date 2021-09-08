import {
  Distributor,
  TaskStatus,
  Artist as PrismaArtist,
} from '.prisma/client';

interface DataModel {
  id: string;
}

interface BaseRelease extends DataModel {
  [key: string]: any;
  targetDate: Date | string;
  name: string;
  type: ReleaseType;
}

export interface Release extends BaseRelease {
  artist: string;
  artwork: string;
  distribution: string;
  mastering?: string;
  musicVideo?: string;
}

export interface EnrichedRelease extends BaseRelease {
  artist: Artist;
  artwork?: Artwork;
  distribution?: Distribution;
  mastering?: Mastering;
  musicVideo?: MusicVideo;
}

export enum ReleaseType {
  SINGLE = 'Single',
  EP = 'EP',
  ALBUM = 'Album',
}

export interface Artist extends PrismaArtist {
  name: string;
}

export interface Contact extends DataModel {
  name: string;
  email?: string;
  phone?: string;
}

export interface User extends DataModel {
  name: string;
  email: string;
}

export type ReleaseTaskStatus =
  | 'Outstanding'
  | 'In progress'
  | 'Waiting'
  | 'Complete';

export interface ReleaseTask extends DataModel {
  [key: string]: any;
  dueDate: Date;
  status: TaskStatus;
  completedOn?: string;
  notes?: string;
  calendarEventId?: string;
}

export interface Distribution extends ReleaseTask {
  distributor: Distributor;
}

interface OutSourceableReleaseTask extends ReleaseTask {
  completedBy?: string;
}

export interface Artwork extends OutSourceableReleaseTask {
  url: string;
}

export interface Mastering extends OutSourceableReleaseTask {
  url: string;
}

export interface MusicVideo extends OutSourceableReleaseTask {
  url: string;
}

export interface ReleaseEvent {
  name: string;
  date: string;
}
