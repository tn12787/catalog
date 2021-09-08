import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from '@storyofams/next-api-decorators';

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

const requiresAuth = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = await getSession({ req });

    if (!session) {
      throw new UnauthorizedException();
    }

    next();
  }
);

export default requiresAuth;
