export interface Release {
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

type ReleaseTaskStatus = 'Outstanding' | 'In progress' | 'Waiting' | 'Complete';

interface ReleaseTask {
  dueDate: string;
  status: ReleaseTaskStatus;
  completedOn?: string;
}

interface Distribution extends ReleaseTask {
  provider: string;
}

interface OutSourceableReleaseTask extends ReleaseTask {
  completedBy?: Contact | Contact[];
}

interface Artwork extends OutSourceableReleaseTask {
  url: string;
}

interface Mastering extends OutSourceableReleaseTask {
  url: string;
}

interface MusicVideo extends OutSourceableReleaseTask {
  url: string;
}
