export interface Release {
  [key: string]: any;
  targetDate: string;
  name: string;
  type: ReleaseType;
  artist: Artist;
  artwork: Artwork;
  distribution: Distribution;
  mastering?: Mastering;
  musicVideo?: MusicVideo;
}

export type ReleaseType = 'Single' | 'EP' | 'Album';

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
