import { pickBy, isNil } from 'lodash';
import { NotFoundException } from '@storyofams/next-api-decorators';
import { pick } from 'lodash';
import { ReleaseTaskType } from '@prisma/client';

import { transformContactsToPrismaQuery } from '../transforms/contacts';

import { CreateReleaseTaskDto, UpdateReleaseTaskDto } from 'backend/models/tasks/combined';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';
import { AuthDecoratedRequest } from 'types/common';
import prisma from 'backend/prisma/client';

export const checkTaskUpdatePermissions = async (req: AuthDecoratedRequest, id: string) => {
  if (!id) throw new NotFoundException();

  const releaseWorkspace = await prisma.release.findUnique({
    where: { id },
    select: {
      workspaceId: true,
      targetDate: true,
    },
  });

  await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseWorkspace?.workspaceId);

  return releaseWorkspace;
};

export const buildCreateReleaseTaskArgs = (body: CreateReleaseTaskDto) => {
  const baseArgs = pickBy(
    {
      ...pick(body, ['status', 'notes', 'dueDate', 'type']),
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      assignees: transformAssigneesToPrismaQuery(body.assignees, true),
      contacts: transformContactsToPrismaQuery(body.contacts, true),
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
      contacts: transformContactsToPrismaQuery(body.contacts),
    },
    (v) => !isNil(v)
  );

  const specificArgs = deriveTypeSpecificUpdateArgs(body, type);

  return { ...baseArgs, ...specificArgs };
};

export const deriveTypeSpecificUpdateArgs = (body: UpdateReleaseTaskDto, type: ReleaseTaskType) => {
  switch (type) {
    case ReleaseTaskType.ARTWORK:
      return body.url ? { artworkData: { update: { url: body.url } } } : undefined;
    case ReleaseTaskType.MASTERING:
      return body.url ? { masteringData: { update: { url: body.url } } } : undefined;
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
