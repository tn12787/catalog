import {
  createMiddlewareDecorator,
  NextFunction,
  NotFoundException,
  UnauthorizedException,
} from '@storyofams/next-api-decorators';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { AuthDecoratedRequest, ExtendedSession } from 'types/common';

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
    const CRON_JOB_KEY = req.headers.authorization?.split(' ')?.at(1) ?? '';

    if (CRON_JOB_KEY !== (process.env.CRON_SERVICE_ACCOUNT_KEY as string)) {
      throw new UnauthorizedException();
    }

    next();
  }
);

const requiresTeamMembership = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const { session } = req as AuthDecoratedRequest;

    const team = req.method === 'GET' ? req.query.team : req.body.team;

    if (!team) {
      throw new NotFoundException();
    }

    if (!session.token.teams.find((userTeam) => userTeam.teamId === team)) {
      throw new NotFoundException();
    }

    next();
  }
);

export { requiresAuth, requiresTeamMembership };
