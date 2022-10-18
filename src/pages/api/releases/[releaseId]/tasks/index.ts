import { Body, createHandler, Post, Req, ValidationPipe } from 'next-api-decorators';

import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
import type { AuthDecoratedRequest } from 'types/auth';
import { getResourceWorkspaceMembership } from 'backend/apiUtils/workspaces';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { buildCreateTaskEvent } from 'backend/apiUtils/taskEvents';
import {
  buildCreateReleaseTaskArgs,
  checkTaskDates,
  checkTaskUpdatePermissions,
} from 'backend/apiUtils/tasks';
import { CreateReleaseTaskDto } from 'backend/models/tasks/combined';

@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createTask(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateReleaseTaskDto,
    @PathParam('releaseId') id: string
  ) {
    const releaseWorkspace = await checkTaskUpdatePermissions(req, id);
    const workspace = await getWorkspaceByIdIsomorphic(req, releaseWorkspace?.workspaceId);

    const activeWorkspaceMember = await getResourceWorkspaceMembership(
      req,
      releaseWorkspace?.workspaceId
    );

    await checkTaskDates(body, id);

    const baseArgs = buildCreateReleaseTaskArgs(workspace, {
      ...body,
      userId: activeWorkspaceMember.id,
    });

    const result = await prisma.releaseTask.create({
      data: {
        ...baseArgs,
        name: body.name,
        release: { connect: { id } },
        type: body.type,
        status: body.status,
        events: {
          create: [
            buildCreateTaskEvent({
              userId: activeWorkspaceMember.id,
              workspace,
            }),
          ],
        },
      },
    });

    return result;
  }
}

export default createHandler(ReleaseListHandler);
