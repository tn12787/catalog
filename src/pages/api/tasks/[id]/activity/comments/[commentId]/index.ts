import {
  Body,
  createHandler,
  Delete,
  NotFoundException,
  Put,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { NextApiRequest } from 'next';
import { TaskEventType } from '@prisma/client';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { UpdateCommentDto } from 'backend/models/tasks/activity/comments/update';
import { ForbiddenException } from 'backend/apiUtils/exceptions';

@requiresAuth()
class ReleaseListHandler {
  @Put()
  async updateComment(
    @Req() req: NextApiRequest,
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
    if (comment.user.id !== (req as any).session.token.sub) {
      throw new ForbiddenException('You are not the author of this comment');
    }

    const result = await prisma.releaseTaskEvent.create({
      data: {
        user: { connect: (req as any).session.token.sub },
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
    @Req() req: NextApiRequest,
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
    // TODO: Support admin comment delete
    if (comment.user.id !== (req as any).session.token.sub) {
      throw new ForbiddenException('You are not the author of this comment');
    }

    const result = await prisma.releaseTaskEvent.create({
      data: {
        user: { connect: (req as any).session.token.sub },
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
