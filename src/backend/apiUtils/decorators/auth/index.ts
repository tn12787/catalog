import { uniq } from 'lodash';
import {
  createMiddlewareDecorator,
  HttpException,
  NextFunction,
  NotFoundException,
  UnauthorizedException,
} from '@storyofams/next-api-decorators';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { ExtendedSession } from 'types';
import { ForbiddenException } from 'backend/apiUtils/exceptions';

const requiresAuth = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = await getSession({ req });

    if (!session) {
      throw new UnauthorizedException();
    }

    (req as any).session = session;

    next();
  }
);

const requiresTeamMembership = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = (req as any).session as { token: ExtendedSession };

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
