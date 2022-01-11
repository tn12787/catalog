import {
  Artist as PrismaArtist,
  Role,
  Permission,
  Team,
  TeamMember,
  User,
  ReleaseTask,
  ArtworkData,
  DistributionData,
  MarketingData,
  MasteringData,
  MusicVideoData,
  Release,
  Distributor,
} from '@prisma/client';

interface DataModel {
  id: string;
}

export interface EnrichedRelease extends Omit<Release, 'targetDate'> {
  artist: Artist;
  targetDate: string | Date;
  tasks: EnrichedReleaseTask[];
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

export type ReleaseTaskStatus = 'Outstanding' | 'In progress' | 'Waiting' | 'Complete';

export type EnrichedReleaseTask = ReleaseTask & {
  assignees: User[];
  artworkData: ArtworkData | null;
  distributionData: (DistributionData & { distributor: Distributor }) | null;
  marketingData: MarketingData | null;
  musicVideoData: MusicVideoData | null;
  masteringData: MasteringData | null;
};

export interface ReleaseEvent {
  name: string;
  date: string;
  type: EventType;
  release: EnrichedRelease;
  data: EnrichedReleaseTask;
}

export enum EventType {
  ARTWORK = 'artwork',
  DISTRIBUTION = 'distribution',
  MARKETING = 'marketing',
  MASTERING = 'mastering',
  MUSIC_VIDEO = 'musicVideo',
  RELEASE = 'release',
}

export type EnrichedTeamMember = TeamMember & {
  team: Team;
  roles: Role & { permissions: Permission[] }[];
};

export interface ExtendedSession {
  email: string;
  name: string;
  picture: string;
  teams: EnrichedTeamMember[];
  sub: string;
}

export type PermissionType =
  | 'CREATE_RELEASES'
  | 'UPDATE_RELEASES'
  | 'DELETE_RELEASES'
  | 'VIEW_RELEASES'
  | 'CREATE_ARTISTS'
  | 'UPDATE_ARTISTS'
  | 'DELETE_ARTISTS'
  | 'VIEW_ARTISTS'
  | 'CREATE_ROLES'
  | 'UPDATE_ROLES'
  | 'DELETE_ROLES'
  | 'VIEW_ROLES'
  | 'INVITE_USERS'
  | 'DELETE_USERS'
  | 'UPDATE_USERS'
  | 'VIEW_USERS'
  | 'VIEW_TEAM'
  | 'UPDATE_TEAM'
  | 'DELETE_TEAM';
