import {
  Body,
  createHandler,
  Post,
  Req,
  ValidationPipe,
  NotFoundException,
} from '@storyofams/next-api-decorators';
import { NotificationType, TaskEventType } from '@prisma/client';

import { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import {
  checkRequiredPermissions,
  getResourceWorkspaceMembership,
} from 'backend/apiUtils/workspaces';
import { CreateCommentDto } from 'backend/models/tasks/activity/comments/create';
import { ForbiddenException } from 'backend/apiUtils/exceptions';

@requiresAuth()
class CommentHandler {
  @Post()
  async createComment(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateCommentDto,
    @PathParam('tsId') taskId: string
  ) {
    if (!taskId) throw new NotFoundException();

    const task = await prisma.releaseTask.findUnique({
      where: { id: taskId },
      select: {
        release: { select: { workspaceId: true } },
        assignees: { select: { id: true } },
      },
    });

    if (!task) throw new ForbiddenException();

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], task?.release?.workspaceId);

    const activeWorkspaceMember = await getResourceWorkspaceMembership(
      req,
      task?.release?.workspaceId
    );

    const [result] = await prisma.$transaction([
      prisma.releaseTaskEvent.create({
        data: {
          user: { connect: { id: activeWorkspaceMember.id } },
          task: { connect: { id: taskId } },
          type: TaskEventType.NEW_COMMENT,
          extraData: {
            newComment: body.text,
          },
        },
      }),
      prisma.notification.createMany({
        data: task.assignees
          .filter((assignee) => assignee.id !== activeWorkspaceMember.id)
          .map((item) => ({
            type: NotificationType.TASK_COMMENT,
            workspaceMemberId: item.id,
            taskId,
            extraData: {},
            actorId: activeWorkspaceMember.id,
          })),
      }),
    ]);

    return result;
  }
}

export default createHandler(CommentHandler);
