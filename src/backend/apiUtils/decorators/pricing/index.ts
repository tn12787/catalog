import {
  createMiddlewareDecorator,
  NextFunction,
  NotFoundException,
  ForbiddenException,
} from 'next-api-decorators';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
import type { AuthDecoratedRequest } from 'types/auth';
import { ProductName } from 'types/billing';
import { hasPaidPlan } from 'utils/billing';

type PaidPlanArgs = { workspaceParamName: string; plan?: ProductName };

export const requiresPaidPlan = ({ workspaceParamName, plan }: PaidPlanArgs) =>
  createMiddlewareDecorator(
    async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
      const workspaceId = req.query[workspaceParamName] as string;
      if (typeof workspaceId !== 'string') throw new NotFoundException();

      const workspace = await getWorkspaceByIdIsomorphic(req as AuthDecoratedRequest, workspaceId);

      if (!hasPaidPlan(workspace, plan)) {
        throw new ForbiddenException('A paid plan is required to use this feature.');
      }

      next();
    }
  )();
