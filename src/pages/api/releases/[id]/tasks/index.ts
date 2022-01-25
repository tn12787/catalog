import { Body, createHandler, Post, Req, ValidationPipe } from '@storyofams/next-api-decorators';

import { getResourceTeamMembership } from 'backend/apiUtils/teams/index';
import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { buildCreateTaskEvent } from 'backend/apiUtils/taskEvents';
import { buildCreateReleaseTaskArgs, checkTaskUpdatePermissions } from 'backend/apiUtils/tasks';
import { ForbiddenException } from 'backend/apiUtils/exceptions';
import { CreateReleaseTaskDto } from 'backend/models/tasks/combined';

@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createArtwork(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateReleaseTaskDto,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await checkTaskUpdatePermissions(req, id);
    const activeTeamMember = await getResourceTeamMembership(req, releaseTeam?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    const baseArgs = buildCreateReleaseTaskArgs(body);

    const result = await prisma.releaseTask.create({
      data: {
        ...baseArgs,
        release: { connect: { id } },
        type: body.type,
        status: body.status,
        events: {
          create: [
            buildCreateTaskEvent({
              userId: activeTeamMember.id,
            }),
          ],
        },
      },
    });

    return result;
  }
}

export default createHandler(ReleaseListHandler);
