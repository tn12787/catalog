import { Invite } from '@prisma/client';
import { rest } from 'msw';

export const testGetInvitationHandler = (invitations: Invite[]) =>
  rest.get('/api/invitations', (req, res, ctx) => {
    return res(ctx.json(invitations));
  });

export const invitationHandlers = [testGetInvitationHandler([])];
