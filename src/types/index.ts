interface BaseRelease {
  [key: string]: any;
  targetDate: string;
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

export enum ReleaseTaskType {
  DISTRIBUTION = 'Distribution',
  ARTWORK = 'Artwork',
  MASTERING = 'Mastering',
  MUSIC_VIDEO = 'Music Video',
}

interface Artist {
  name: string;
}

export interface Contact {
  name: string;
  email?: string;
  phone?: string;
}

export interface User {
  name: string;
  email: string;
}

export type ReleaseTaskStatus =
  | 'Outstanding'
  | 'In progress'
  | 'Waiting'
  | 'Complete';

export interface ReleaseTask {
  [key: string]: any;
  dueDate: string;
  status: ReleaseTaskStatus;
  completedOn?: string;
  notes?: string;
  calendarEventId?: string;
}

export interface Distribution extends ReleaseTask {
  distributor: string;
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
