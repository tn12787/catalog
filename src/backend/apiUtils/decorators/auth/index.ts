import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from '@storyofams/next-api-decorators';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { AuthDecoratedRequest, ExtendedSession } from 'types/auth';

const requiresAuth = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = (await getSession({ req })) as ExtendedSession;

    if (!session) {
      throw new UnauthorizedException();
    }

    const updatedReq = req as AuthDecoratedRequest;
    updatedReq.session = session;

    next();
  }
);

export const requiresServiceAccount = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) throw new UnauthorizedException();

    const [_, CRON_JOB_KEY] = authorization.split(' ');

    if (CRON_JOB_KEY !== (process.env.CRON_SERVICE_ACCOUNT_KEY as string)) {
      throw new UnauthorizedException();
    }

    next();
  }
);

export { requiresAuth };
