import {
  BadRequestException,
  createMiddlewareDecorator,
  NextFunction,
  NotFoundException,
  UnauthorizedException,
} from '@storyofams/next-api-decorators';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
});

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

export const requiresStripeSignature = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    const sig = req.headers['stripe-signature'];
    try {
      stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret);
    } catch (err) {
      const error = err as Stripe.StripeError;
      throw new BadRequestException(error.message);
    }

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
