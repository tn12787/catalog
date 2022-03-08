import {
  BadRequestException,
  Body,
  createHandler,
  Get,
  NotFoundException,
  Patch,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { getResourceWorkspaceMembership } from 'backend/apiUtils/workspaces';
import { AuthDecoratedRequest } from 'types/common';
import { ForbiddenException } from 'backend/apiUtils/exceptions';
import { createUpdateTaskEvents } from 'backend/apiUtils/taskEvents';
import { checkTaskUpdatePermissions, buildUpdateReleaseTaskArgs } from 'backend/apiUtils/tasks';
import { UpdateReleaseTaskDto } from 'backend/models/tasks/combined';
import { getTaskByIdIsomorphic } from 'backend/isomorphic/tasks';

@requiresAuth()
class SingleTaskHandler {
  @Get()
  async fetchTask(@Req() req: AuthDecoratedRequest, @PathParam('tsId') id: string) {
    return await getTaskByIdIsomorphic(req, id);
  }

  @Patch()
  async updateTask(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateReleaseTaskDto,
    @PathParam('tsId') id: string
  ) {
    if (!id) throw new NotFoundException();

    // TODO: replace with a direct update
    const releaseTask = await prisma.releaseTask.findUnique({
      where: {
        id,
      },
      select: {
        releaseId: true,
        release: { select: { targetDate: true } },
        type: true,
      },
    });

    if (!releaseTask) {
      throw new NotFoundException();
    }

    if (body.dueDate && new Date(body.dueDate) > releaseTask.release.targetDate) {
      throw new BadRequestException();
    }

    const releaseWorkspace = await checkTaskUpdatePermissions(req, releaseTask.releaseId);

    const updateArgs = {
      ...buildUpdateReleaseTaskArgs(body, releaseTask.type),
    };

    const activeWorkspaceMember = await getResourceWorkspaceMembership(
      req,
      releaseWorkspace?.workspaceId
    );
    if (!activeWorkspaceMember) throw new ForbiddenException();

    const eventsToCreate = await createUpdateTaskEvents({
      body,
      releaseId: releaseTask.releaseId,
      type: releaseTask.type,
      userId: activeWorkspaceMember?.id as string,
    });

    await prisma.releaseTask.update({
      where: {
        releaseId_type: {
          releaseId: releaseTask.releaseId,
          type: releaseTask.type,
        },
      },
      data: { ...updateArgs, events: { create: eventsToCreate as any } }, // TODO: find a type for this
    });
  }
}

export default createHandler(SingleTaskHandler);
