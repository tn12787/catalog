import { Team, TeamUser } from '@prisma/client';

import {
  Distributor,
  TaskStatus,
  Artist as PrismaArtist,
  Role,
  Permission,
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
  dueDate: Date | string;
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
  type: EventType;
  release: EnrichedRelease;
  data: ReleaseTask;
}

export enum EventType {
  ARTWORK = 'artwork',
  DISTRIBUTION = 'distribution',
  MARKETING = 'marketing',
  MASTERING = 'mastering',
  MUSIC_VIDEO = 'musicVideo',
  RELEASE = 'release',
}

export type EnrichedTeamUser = TeamUser & {
  team: Team;
  roles: Role & { permissions: Permission[] }[];
};

export interface ExtendedSession {
  email: string;
  name: string;
  picture: string;
  teams: EnrichedTeamUser[];
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
