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
  EmailPreferences,
  Subscription,
  ReleaseTrack,
} from '@prisma/client';

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

export type UserResponse = User & {
  workspaces: EnrichedWorkspaceMember[];
  emailPreferences: EmailPreferences;
};

export interface ClientRelease extends Omit<EnrichedRelease, 'tasks' | 'targetDate'> {
  artwork?: ReleaseTaskWithAssignees & Omit<ArtworkData, 'taskId'>;
  distribution?: ReleaseTaskWithAssignees &
    Omit<DistributionData, 'taskId'> & { distributor?: Distributor };
  mastering?: ReleaseTaskWithAssignees & Omit<MasteringData, 'taskId'>;
  generic: TaskResponse[];
  targetDate: string | Date;
  tracks: (ReleaseTrack & { mainArtists: Artist[] })[];
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

export type EnrichedWorkspace = Workspace & {
  invites: Invite[];
  members: WorkspaceMemberWithUserAndRoles[];
  subscription: Subscription | null;
};
