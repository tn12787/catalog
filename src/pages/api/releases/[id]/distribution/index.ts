import { pickBy, isNil } from 'lodash';
import {
  Body,
  createHandler,
  Delete,
  Post,
  Patch,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { ReleaseTaskType } from '@prisma/client';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { CreateDistributionDto } from 'backend/models/distribution/create';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateDistributionDto } from 'backend/models/distribution/update';
import { AuthDecoratedRequest } from 'types';
import { buildCreateTaskEvent, createUpdateTaskEvents } from 'backend/apiUtils/taskEvents';
import {
  buildCreateReleaseTaskArgs,
  buildUpdateReleaseTaskArgs,
  checkTaskUpdatePermissions,
} from 'backend/apiUtils/tasks';
import { ForbiddenException } from 'backend/apiUtils/exceptions';
import { getResourceTeamMembership } from 'backend/apiUtils/teams';

@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createDistribution(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateDistributionDto,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await checkTaskUpdatePermissions(req, id);
    const activeTeamMember = await getResourceTeamMembership(req, releaseTeam?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    const baseArgs = buildCreateReleaseTaskArgs(body);

    const result = await prisma.releaseTask.create({
      data: {
        ...baseArgs,
        type: ReleaseTaskType.DISTRIBUTION,
        distributionData: { create: { distributor: { connect: { id: body.distributor } } } },
        release: { connect: { id } },
        events: {
          create: [buildCreateTaskEvent({ userId: activeTeamMember.id })],
        },
      },
    });

    return result;
  }

  @Patch()
  async updateDistribution(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateDistributionDto,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await checkTaskUpdatePermissions(req, id);

    const updateArgs = pickBy(
      {
        ...buildUpdateReleaseTaskArgs(body),
        distributionData: {
          update: {
            distributor: body.distributor ? { connect: { id: body.distributor } } : undefined,
          },
        },
      },
      (v) => !isNil(v)
    );

    const activeTeamMember = await getResourceTeamMembership(req, releaseTeam?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    const eventsToCreate = await createUpdateTaskEvents({
      body,
      releaseId: id,
      type: ReleaseTaskType.DISTRIBUTION,
      userId: activeTeamMember?.id as string,
    });

    const result = await prisma.releaseTask.update({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.DISTRIBUTION,
        },
      },
      data: { ...updateArgs, events: { create: eventsToCreate as any } }, // TODO: fix type,
    });

    return result;
  }

  @Delete()
  async deleteDistribution(@Req() req: AuthDecoratedRequest, @PathParam('id') id: string) {
    await checkTaskUpdatePermissions(req, id);

    const result = await prisma.releaseTask.delete({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.DISTRIBUTION,
        },
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
