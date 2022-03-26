import {
  Body,
  createHandler,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { NotificationType } from '@prisma/client';

import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
import { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { getResourceWorkspaceMembership } from 'backend/apiUtils/workspaces';
import { createUpdateTaskEvents } from 'backend/apiUtils/taskEvents';
import {
  checkTaskUpdatePermissions,
  buildUpdateReleaseTaskArgs,
  checkTaskDates,
} from 'backend/apiUtils/tasks';
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
        release: { select: { targetDate: true, workspaceId: true } },
        type: true,
        assignees: true,
        dueDate: true,
        status: true,
      },
    });

    if (!releaseTask) {
      throw new NotFoundException();
    }

    await checkTaskUpdatePermissions(req, releaseTask.releaseId);

    const workspace = await getWorkspaceByIdIsomorphic(req, releaseTask.release.workspaceId);

    await checkTaskDates(releaseTask, releaseTask.releaseId);

    const updateArgs = {
      ...buildUpdateReleaseTaskArgs(workspace, body, releaseTask.type),
    };

    const activeWorkspaceMember = await getResourceWorkspaceMembership(req, workspace.id);

    const eventsToCreate = await createUpdateTaskEvents({
      body,
      id,
      userId: activeWorkspaceMember?.id as string,
    });

    const currentAssignees = releaseTask.assignees.map((assignee) => assignee.id);

    const newAssignees = body.assignees?.filter((item) => !currentAssignees.includes(item)) ?? [];

    await prisma.$transaction([
      prisma.releaseTask.update({
        where: {
          id,
        },
        data: { ...updateArgs, events: { create: eventsToCreate as any } }, // TODO: find a type for this
      }),
      prisma.notification.createMany({
        data: newAssignees
          .filter((item) => item !== activeWorkspaceMember.id)
          .map((item) => ({
            type: NotificationType.TASK_ASSIGNED,
            workspaceMemberId: item,
            taskId: id,
            extraData: {},
            actorId: activeWorkspaceMember.id,
          })),
      }),
    ]);
  }

  @Delete()
  async deleteTask(@Req() req: AuthDecoratedRequest, @PathParam('tsId') id: string) {
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
        assignees: true,
        dueDate: true,
        status: true,
      },
    });

    if (!releaseTask) {
      throw new NotFoundException();
    }

    await checkTaskUpdatePermissions(req, releaseTask.releaseId);

    await prisma.releaseTask.delete({ where: { id } });

    return releaseTask;
  }
}

export default createHandler(SingleTaskHandler);
