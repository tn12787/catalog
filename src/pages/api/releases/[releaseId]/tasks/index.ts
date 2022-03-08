import { Body, createHandler, Post, Req, ValidationPipe } from '@storyofams/next-api-decorators';

import { getResourceWorkspaceMembership } from 'backend/apiUtils/workspaces';
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
    @PathParam('releaseId') id: string
  ) {
    const releaseWorkspace = await checkTaskUpdatePermissions(req, id);
    const activeWorkspaceMember = await getResourceWorkspaceMembership(
      req,
      releaseWorkspace?.workspaceId
    );
    if (!activeWorkspaceMember) throw new ForbiddenException();

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
              userId: activeWorkspaceMember.id,
            }),
          ],
        },
      },
    });

    return result;
  }
}

export default createHandler(ReleaseListHandler);