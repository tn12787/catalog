import { Body, createHandler, Post, Req, ValidationPipe } from '@storyofams/next-api-decorators';
import { ReleaseTaskType } from '@prisma/client';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { CreateDistributionDto } from 'backend/models/distribution/create';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { AuthDecoratedRequest } from 'types/common';
import { buildCreateTaskEvent } from 'backend/apiUtils/taskEvents';
import { buildCreateReleaseTaskArgs, checkTaskUpdatePermissions } from 'backend/apiUtils/tasks';
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
}

export default createHandler(ReleaseListHandler);
