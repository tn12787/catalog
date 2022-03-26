import { startOfDay } from 'date-fns';
import { pickBy, isNil } from 'lodash';
import { NotFoundException, BadRequestException } from '@storyofams/next-api-decorators';
import { pick } from 'lodash';
import { ReleaseTask, ReleaseTaskType } from '@prisma/client';

import { transformContactsToPrismaQuery } from '../transforms/contacts';
import { buildCreateTaskEvent } from '../taskEvents';

import { AuthDecoratedRequest } from 'types/auth';
import { CreateReleaseTaskDto, UpdateReleaseTaskDto } from 'backend/models/tasks/combined';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';
import prisma from 'backend/prisma/client';
import { EnrichedWorkspace } from 'types/common';
import { hasPaidPlan } from 'utils/billing';

export const checkTaskUpdatePermissions = async (req: AuthDecoratedRequest, id: string) => {
  if (!id) throw new NotFoundException();

  const releaseWorkspace = await prisma.release.findUnique({
    where: { id },
    select: {
      workspaceId: true,
      targetDate: true,
    },
  });

  if (!releaseWorkspace) throw new NotFoundException(`Release with id ${id} not found`);

  await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseWorkspace?.workspaceId);

  return releaseWorkspace;
};

export const buildCreateReleaseTaskArgs = (
  workspace: EnrichedWorkspace,
  body: CreateReleaseTaskDto & { userId: string }
) => {
  const baseArgs = pickBy(
    {
      ...pick(body, ['status', 'notes', 'dueDate', 'type', 'name']),
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      assignees: transformAssigneesToPrismaQuery(body.assignees, true),
      contacts: hasPaidPlan(workspace, 'Label Plan')
        ? transformContactsToPrismaQuery(body.contacts, true)
        : undefined,
      events: {
        create: [
          buildCreateTaskEvent({
            userId: body.userId,
          }),
        ],
      },
    },
    (v) => !isNil(v)
  );

  const specificArgs = deriveTypeSpecificCreateArgs(body);

  return { ...baseArgs, ...specificArgs };
};

export const buildUpdateReleaseTaskArgs = (
  workspace: EnrichedWorkspace,
  body: UpdateReleaseTaskDto,
  type: ReleaseTaskType
) => {
  const baseArgs = pickBy(
    {
      ...pick(body, ['status', 'notes', 'dueDate', 'name']),
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      assignees: transformAssigneesToPrismaQuery(body.assignees),
      contacts: hasPaidPlan(workspace, 'Label Plan')
        ? transformContactsToPrismaQuery(body.contacts, true)
        : undefined,
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

export const checkTaskDates = async (
  task: Omit<ReleaseTask, 'assignees'> | Omit<CreateReleaseTaskDto, 'assignees'>,
  releaseId: string
) => {
  const release = await prisma.release.findUnique({
    where: {
      id: releaseId,
    },
  });

  if (!release) {
    throw new NotFoundException();
  }

  // allow generic tasks to be after the due date
  if (task.type === ReleaseTaskType.GENERIC) {
    return;
  }

  // otherwise, tasks have to be due before release day
  if (startOfDay(task.dueDate) >= startOfDay(release.targetDate)) {
    throw new BadRequestException('Task due date must be before release date');
  }
};
