import { pickBy, isNil } from 'lodash';
import { NotFoundException } from '@storyofams/next-api-decorators';
import { pick } from 'lodash';

import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { UpdateBaseReleaseTaskDto } from 'backend/models/tasks/update';
import { CreateBaseReleaseTaskDto } from 'backend/models/tasks/create';
import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';
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

  return releaseTeam;
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

export const buildUpdateReleaseTaskArgs = (body: UpdateBaseReleaseTaskDto) => {
  return pickBy(
    {
      ...pick(body, ['status', 'notes', 'dueDate']),
      assignees: transformAssigneesToPrismaQuery(body.assignees),
    },
    (v) => !isNil(v)
  );
};
