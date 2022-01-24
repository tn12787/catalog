import { Session } from 'next-auth';
import type { NextApiRequest } from 'next';
import {
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
  MarketingLink,
  Artist,
  ReleaseTaskEvent,
} from '@prisma/client';

interface DataModel {
  id: string;
}

export interface ClientReleaseTask extends Omit<ReleaseTask, 'dueDate'> {
  dueDate: string | Date;
}

export type TeamMemberWithUser = TeamMember & { user: User };

export type TeamMemberWithUserAndRoles = TeamMemberWithUser & {
  roles: Role[];
};

export type ReleaseTaskWithAssignees = ReleaseTask & {
  assignees: TeamMemberWithUser[];
};

export type ReleaseTaskEventWithUser = ReleaseTaskEvent & {
  user: TeamMemberWithUser;
};

export interface EnrichedRelease extends Release {
  artist: Partial<Artist>;

  tasks: EnrichedReleaseTask[];
}

export interface ClientRelease extends Omit<EnrichedRelease, 'tasks' | 'targetDate'> {
  artwork?: ReleaseTaskWithAssignees & Omit<ArtworkData, 'taskId'>;
  distribution?: ReleaseTaskWithAssignees &
    Omit<DistributionData, 'taskId'> & { distributor?: Distributor };
  marketing?: ReleaseTaskWithAssignees & Omit<MarketingData, 'taskId'> & { links: MarketingLink[] };
  mastering?: ReleaseTaskWithAssignees & Omit<MasteringData, 'taskId'>;
  musicVideo?: ReleaseTaskWithAssignees & Omit<MusicVideoData, 'taskId'>;
  targetDate: string | Date;
}

export type ClientArtwork = Required<ClientRelease>['artwork'];
export type ClientDistribution = Required<ClientRelease>['distribution'];
export type ClientMarketing = Required<ClientRelease>['marketing'];
export type ClientMastering = Required<ClientRelease>['mastering'];
export type ClientMusicVideo = Required<ClientRelease>['musicVideo'];

export type ClientReleaseTaskData =
  | ClientArtwork
  | ClientDistribution
  | ClientMarketing
  | ClientMastering
  | ClientMusicVideo;

export enum ReleaseType {
  SINGLE = 'Single',
  EP = 'EP',
  ALBUM = 'Album',
}

export interface Contact extends DataModel {
  name: string;
  email?: string;
  phone?: string;
}

export type ReleaseTaskStatus = 'Outstanding' | 'In progress' | 'Waiting' | 'Complete';

export type EnrichedReleaseTask = ReleaseTaskWithAssignees & {
  artworkData: ArtworkData | null;
  distributionData: (DistributionData & { distributor?: Distributor }) | null;
  marketingData: (MarketingData & { links?: MarketingLink[] }) | null;
  musicVideoData: MusicVideoData | null;
  masteringData: MasteringData | null;
  dueDate: Date | null;
};

export interface ReleaseEvent {
  name: string;
  date: string;
  type: EventType;
  release: EnrichedRelease;
  data: ClientReleaseTaskData;
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

export type ExtendedSession = Session & { token: ExtendedToken };

export interface ExtendedToken {
  email: string;
  name: string;
  picture: string;
  teams: EnrichedTeamMember[];
  sub: string;
}

export interface AuthDecoratedRequest extends NextApiRequest {
  session: ExtendedSession;
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
  | 'DELETE_TEAM'
  | 'DELETE_ALL_COMMENTS';