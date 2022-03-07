import { artistHandlers } from './artists';
import { authHandlers } from './auth';
import { invitationHandlers } from './invitations';
import { userHandlers } from './users';

export const handlers = [
  ...artistHandlers,
  ...authHandlers,
  ...userHandlers,
  ...invitationHandlers,
];
