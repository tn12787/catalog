import { NextApiRequest } from 'next';

import { ExtendedSession } from '../common/index';

export interface AuthDecoratedRequest extends NextApiRequest {
  session: ExtendedSession;
}
