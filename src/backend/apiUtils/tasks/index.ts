import { pickBy } from 'lodash';
import { NotFoundException } from '@storyofams/next-api-decorators';

import { checkRequiredPermissions } from '../teams';

import { CreateBaseReleaseTaskDto } from './../../models/tasks/create';

import { AuthDecoratedRequest } from 'types';
import prisma from 'backend/prisma/client';

export const checkTaskUpdatePermissions = async (req: AuthDecoratedRequest, id: string) => {
  if (!id) throw new NotFoundException();

  const releaseTeam = await prisma.release.findUnique({
    where: { id },
    select: {
      teamId: true,
      targetDate: true,
    },
  });

  await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);
};

export const buildCreateReleaseTaskArgs = (body: CreateBaseReleaseTaskDto) => {
  const optionalArgs = pickBy(
    {
      assignees: body.assignees
        ? {
            connect: body.assignees.map((id) => ({
              id,
            })),
          }
        : undefined,
      notes: body.notes,
    },
    (v) => v !== undefined
  );

  return {
    ...optionalArgs,
    dueDate: body.dueDate,
    status: body.status,
  };
};
