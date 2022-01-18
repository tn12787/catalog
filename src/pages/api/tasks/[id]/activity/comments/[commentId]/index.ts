import {
  Body,
  createHandler,
  Delete,
  NotFoundException,
  Put,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { TaskEventType } from '@prisma/client';

import { AuthDecoratedRequest } from 'types';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions, getAllUserPermissionsForTeam } from 'backend/apiUtils/teams';
import { UpdateCommentDto } from 'backend/models/tasks/activity/comments/update';
import { ForbiddenException } from 'backend/apiUtils/exceptions';

@requiresAuth()
class ReleaseListHandler {
  @Put()
  async updateComment(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateCommentDto,
    @PathParam('id') taskId: string,
    @PathParam('commentId') commentId: string
  ) {
    if (!taskId) throw new NotFoundException();

    const task = await prisma.releaseTask.findUnique({
      where: { id: taskId },
      select: {
        release: { select: { teamId: true } },
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], task?.release?.teamId);

    //check if comment exists
    const comment = await prisma.releaseTaskEvent.findUnique({
      where: { id: commentId },
      include: {
        user: { select: { id: true } },
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // check if user is the author of the comment
    if (comment.user.id !== req.session.token.sub) {
      throw new ForbiddenException('You are not the author of this comment');
    }

    const result = await prisma.releaseTaskEvent.create({
      data: {
        user: { connect: { id: req.session.token.sub } },
        task: { connect: { id: taskId } },
        type: TaskEventType.UPDATE_COMMENT,
        extraData: {
          commentId: commentId,
          newComment: body.text,
        },
      },
    });

    return result;
  }

  @Delete()
  async deleteComment(
    @Req() req: AuthDecoratedRequest,
    @PathParam('id') taskId: string,
    @PathParam('commentId') commentId: string
  ) {
    if (!taskId) throw new NotFoundException();

    const task = await prisma.releaseTask.findUnique({
      where: { id: taskId },
      select: {
        release: { select: { teamId: true } },
      },
    });

    await checkRequiredPermissions(
      req,
      ['UPDATE_RELEASES', 'DELETE_ALL_COMMENTS'],
      task?.release?.teamId
    );

    //check if comment exists
    const comment = await prisma.releaseTaskEvent.findUnique({
      where: { id: commentId },
      include: {
        user: { select: { id: true } },
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // To delete a comment, the user must either be the author of the comment, or have the DELETE_ALL_COMMENTS permission
    const userPermissions = await getAllUserPermissionsForTeam(req, task?.release?.teamId);
    const canDelete =
      comment.user.id === req.session.token.sub || userPermissions.includes('DELETE_ALL_COMMENTS');

    if (!canDelete) {
      throw new ForbiddenException('You are not the author of this comment');
    }

    const result = await prisma.releaseTaskEvent.create({
      data: {
        user: { connect: { id: req.session.token.sub } },
        task: { connect: { id: taskId } },
        type: TaskEventType.DELETE_COMMENT,
        extraData: {
          commentId: commentId,
        },
      },
    });

    return result;
  }
}

export default createHandler(ReleaseListHandler);
