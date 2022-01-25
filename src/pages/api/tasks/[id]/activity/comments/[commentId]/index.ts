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

import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import {
  checkRequiredPermissions,
  getAllUserPermissionsForTeam,
  getResourceTeamMembership,
} from 'backend/apiUtils/teams';
import { UpdateCommentDto } from 'backend/models/tasks/activity/comments/update';
import { ForbiddenException } from 'backend/apiUtils/exceptions';

@requiresAuth()
class SpecificCommentHandler {
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

    const activeTeamMember = await getResourceTeamMembership(req, task?.release?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    // check if user is the author of the comment
    if (comment.user.id !== activeTeamMember.id) {
      throw new ForbiddenException('You are not the author of this comment');
    }

    const result = await prisma.releaseTaskEvent.create({
      data: {
        user: { connect: { id: activeTeamMember.id } },
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

    const activeTeamMember = await getResourceTeamMembership(req, task?.release?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    // To delete a comment, the user must either be the author of the comment, or have the DELETE_ALL_COMMENTS permission
    const userPermissions = await getAllUserPermissionsForTeam(req, task?.release?.teamId);
    const canDelete =
      comment.user.id === activeTeamMember.id || userPermissions.includes('DELETE_ALL_COMMENTS');

    if (!canDelete) {
      throw new ForbiddenException('You are not the author of this comment');
    }

    // remove original comment and updates
    const [_, newEvent] = await prisma.$transaction([
      prisma.releaseTaskEvent.deleteMany({
        where: {
          OR: [
            { id: commentId, type: TaskEventType.NEW_COMMENT },
            {
              extraData: {
                path: ['commentId'],
                equals: commentId,
              },
              type: TaskEventType.UPDATE_COMMENT,
            },
          ],
        },
      }),
      prisma.releaseTaskEvent.create({
        data: {
          user: { connect: { id: activeTeamMember.id } },
          task: { connect: { id: taskId } },
          type: TaskEventType.DELETE_COMMENT,
          extraData: {
            user: comment.userId,
          },
        },
      }),
    ]);

    return newEvent;
  }
}

export default createHandler(SpecificCommentHandler);
