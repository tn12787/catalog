import { pickBy, isNil } from 'lodash';
import { NotFoundException } from '@storyofams/next-api-decorators';
import { pick } from 'lodash';
import { ReleaseTaskType } from '@prisma/client';

import { UpdateReleaseTaskDto } from 'backend/models/tasks/combined';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { UpdateBaseReleaseTaskDto } from 'backend/models/tasks/update';
import { CreateBaseReleaseTaskDto } from 'backend/models/tasks/create';
import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';
import { AuthDecoratedRequest } from 'types/common';
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

export const buildUpdateReleaseTaskArgs = (body: UpdateReleaseTaskDto, type: ReleaseTaskType) => {
  const baseArgs = pickBy(
    {
      ...pick(body, ['status', 'notes', 'dueDate']),
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      assignees: transformAssigneesToPrismaQuery(body.assignees),
    },
    (v) => !isNil(v)
  );

  const specificArgs = deriveTypeSpecificArgs(body, type);

  return { ...baseArgs, ...specificArgs };
};

export const deriveTypeSpecificArgs = (body: UpdateReleaseTaskDto, type: ReleaseTaskType) => {
  // TODO: Support marketing
  switch (type) {
    case ReleaseTaskType.ARTWORK:
      return body.url ? { artworkData: { update: { url: body.url } } } : undefined;
    case ReleaseTaskType.MASTERING:
      return body.url ? { masteringData: { update: { url: body.url } } } : undefined;
    case ReleaseTaskType.MUSIC_VIDEO:
      return body.url ? { musicVideoData: { update: { url: body.url } } } : undefined;
    case ReleaseTaskType.DISTRIBUTION:
      return body.distributor
        ? {
            distributionData: {
              update: {
                distributor: body.distributor ? { connect: { id: body.distributor } } : undefined,
              },
            },
          }
        : undefined;
    default:
      return undefined;
  }
};
