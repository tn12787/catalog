import {
  Body,
  createHandler,
  Post,
  Req,
  ValidationPipe,
  NotFoundException,
} from '@storyofams/next-api-decorators';
import { TaskEventType } from '@prisma/client';

import { checkTaskUpdatePermissions } from './../../../../../../backend/apiUtils/tasks/index';

import { AuthDecoratedRequest } from 'types';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions, getResourceTeamMembership } from 'backend/apiUtils/teams';
import { CreateCommentDto } from 'backend/models/tasks/activity/comments/create';
import { ForbiddenException } from 'backend/apiUtils/exceptions';

@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createComment(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateCommentDto,
    @PathParam('id') taskId: string
  ) {
    if (!taskId) throw new NotFoundException();

    const task = await prisma.releaseTask.findUnique({
      where: { id: taskId },
      select: {
        release: { select: { teamId: true } },
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], task?.release?.teamId);

    const activeTeamMember = await getResourceTeamMembership(req, task?.release?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    const result = await prisma.releaseTaskEvent.create({
      data: {
        user: { connect: { id: activeTeamMember.id } },
        task: { connect: { id: taskId } },
        type: TaskEventType.NEW_COMMENT,
        extraData: {
          newComment: body.text,
        },
      },
    });

    return result;
  }
}

export default createHandler(ReleaseListHandler);
