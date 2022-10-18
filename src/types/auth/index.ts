import type { NextApiRequest } from 'next';
import { Session } from 'next-auth';

import { EnrichedWorkspaceMember } from 'types/common';

export interface AuthDecoratedRequest extends NextApiRequest {
  session: ExtendedSession;
}

export interface ExtendedToken {
  email: string;
  name: string;
  picture: string;
  workspaceMemberships: EnrichedWorkspaceMember[];
  sub: string;
}

export type ExtendedSession = Session & { token: ExtendedToken };
