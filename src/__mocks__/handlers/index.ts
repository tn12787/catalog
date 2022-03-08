import { artistHandlers } from './artists';
import { authHandlers } from './auth';
import { invitationHandlers } from './invitations';
import { releaseHandlers } from './releases';
import { userHandlers } from './users';
import { workspaceHandlers } from './workspaces';

export const handlers = [
  ...artistHandlers,
  ...authHandlers,
  ...userHandlers,
  ...invitationHandlers,
  ...workspaceHandlers,
  ...releaseHandlers,
];
