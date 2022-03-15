import { Session } from 'next-auth';
import type { NextApiRequest } from 'next';
import {
  Role,
  Permission,
  Workspace,
  WorkspaceMember,
  User,
  ReleaseTask,
  ArtworkData,
  DistributionData,
  MasteringData,
  Release,
  Distributor,
  Notification,
  Artist,
  ReleaseTaskEvent,
  Invite,
  ContactLabel,
  Contact,
} from '@prisma/client';
import Stripe from 'stripe';

export interface ClientReleaseTask extends Omit<ReleaseTask, 'dueDate'> {
  dueDate: string | Date | null;
}

export type WorkspaceMemberWithUser = WorkspaceMember & { user: User };

export type WorkspaceMemberWithUserAndRoles = WorkspaceMemberWithUser & {
  roles: Role[];
};

export type ContactWithLabels = Contact & {
  labels?: ContactLabel[];
};

export type ContactLabelWithContacts = ContactLabel & {
  contacts?: Contact[];
};

export type NotificationWithTask = Notification & {
  task: ReleaseTask & { release: Release };
  actor: WorkspaceMemberWithUser | null;
};

export type ReleaseTaskWithAssignees = ReleaseTask & {
  assignees: WorkspaceMember[];
  contacts: ContactWithLabels[];
};

export type ReleaseTaskEventWithUser = ReleaseTaskEvent & {
  user: WorkspaceMemberWithUser;
};

export interface EnrichedRelease extends Release {
  artist: Partial<Artist>;

  tasks: EnrichedReleaseTask[];
}

export type EnrichedReleaseWithoutArtist = Omit<EnrichedRelease, 'artist'>;

export type ArtistResponse = Artist & { releases: ClientRelease[] };

export type TaskResponse = EnrichedReleaseTask & { release: Release };

export type UserResponse = User & { workspaces: EnrichedWorkspaceMember[] };

export interface ClientRelease extends Omit<EnrichedRelease, 'tasks' | 'targetDate'> {
  artwork?: ReleaseTaskWithAssignees & Omit<ArtworkData, 'taskId'>;
  distribution?: ReleaseTaskWithAssignees &
    Omit<DistributionData, 'taskId'> & { distributor?: Distributor };
  mastering?: ReleaseTaskWithAssignees & Omit<MasteringData, 'taskId'>;
  generic: TaskResponse[];
  targetDate: string | Date;
}

export type ClientArtwork = Required<ClientRelease>['artwork'];
export type ClientDistribution = Required<ClientRelease>['distribution'];
export type ClientMastering = Required<ClientRelease>['mastering'];

export type ClientReleaseTaskData =
  | ClientArtwork
  | ClientDistribution
  | ClientMastering
  | TaskResponse;

export enum ReleaseType {
  SINGLE = 'Single',
  EP = 'EP',
  ALBUM = 'Album',
}

export type ReleaseTaskStatus = 'Outstanding' | 'In progress' | 'Waiting' | 'Complete';

export type EnrichedReleaseTask = ReleaseTaskWithAssignees & {
  artworkData: ArtworkData | null;
  distributionData: (DistributionData & { distributor?: Distributor }) | null;
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
  GENERIC = 'generic',
  MASTERING = 'mastering',
  RELEASE = 'release',
}

export type RoleWithPermission = Role & { permissions: Permission[] };

export type EnrichedWorkspaceMember = WorkspaceMember & {
  workspace: Workspace;
  roles: RoleWithPermission[];
};

export type ExtendedSession = Session & { token: ExtendedToken };

export type EnrichedWorkspace = Workspace & {
  invites: Invite[];
  members: WorkspaceMemberWithUserAndRoles[];
  subscription?: MappedSubscription;
};

export interface ExtendedToken {
  email: string;
  name: string;
  picture: string;
  workspaceMemberships: EnrichedWorkspaceMember[];
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
  | 'DELETE_ALL_COMMENTS'
  | 'CREATE_CONTACTS'
  | 'VIEW_CONTACTS'
  | 'UPDATE_CONTACTS'
  | 'DELETE_CONTACTS';

export type MailingListData = {
  firstName: string;
  lastName: string;
  email: string;
};

export type MappedSubscription = {
  product: {
    id: string;
    name: string;
  };
  status: Stripe.Subscription.Status;
  trialEnd: Date | null;
  totalSeats: number;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelTime: Date | null;
  interval: Stripe.SubscriptionItem['plan']['interval'];
};
