import { pickBy, isNil } from 'lodash';
import { NotFoundException } from '@storyofams/next-api-decorators';
import { pick } from 'lodash';
import { ReleaseTaskType } from '@prisma/client';

import { CreateReleaseTaskDto, UpdateReleaseTaskDto } from 'backend/models/tasks/combined';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
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

export const buildCreateReleaseTaskArgs = (body: CreateReleaseTaskDto) => {
  const baseArgs = pickBy(
    {
      ...pick(body, ['status', 'notes', 'dueDate']),
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      assignees: transformAssigneesToPrismaQuery(body.assignees, true),
    },
    (v) => !isNil(v)
  );

  const specificArgs = deriveTypeSpecificCreateArgs(body);

  return { ...baseArgs, ...specificArgs };
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

  const specificArgs = deriveTypeSpecificUpdateArgs(body, type);

  return { ...baseArgs, ...specificArgs };
};

export const deriveTypeSpecificUpdateArgs = (body: UpdateReleaseTaskDto, type: ReleaseTaskType) => {
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

export const deriveTypeSpecificCreateArgs = (body: CreateReleaseTaskDto) => {
  switch (body.type) {
    case ReleaseTaskType.ARTWORK:
      return { artworkData: { create: { url: body.url } } };
    case ReleaseTaskType.MASTERING:
      return { masteringData: { create: { url: body.url } } };
    case ReleaseTaskType.MUSIC_VIDEO:
      return { musicVideoData: { create: { url: body.url } } };
    case ReleaseTaskType.DISTRIBUTION:
      return {
        distributionData: {
          create: {
            distributor: {
              connect: {
                id: body.distributor,
              },
            },
          },
        },
      };

    default:
      return undefined;
  }
};
