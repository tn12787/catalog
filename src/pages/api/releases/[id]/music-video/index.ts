import {
  Body,
  createHandler,
  Delete,
  Post,
  Put,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { ReleaseTaskType } from '@prisma/client';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { CreateMusicVideoDto } from 'backend/models/musicVideo/create';
import { UpdateMusicVideoDto } from 'backend/models/musicVideo/update';
import { createNewTaskEvent, createUpdateTaskEvents } from 'backend/apiUtils/taskEvents';
import { AuthDecoratedRequest } from 'types';
import {
  buildCreateReleaseTaskArgs,
  buildUpdateReleaseTaskArgs,
  checkTaskUpdatePermissions,
} from 'backend/apiUtils/tasks';
import { ForbiddenException } from 'backend/apiUtils/exceptions';
import { getResourceTeamMembership } from 'backend/apiUtils/teams';

@requiresAuth()
class MusicVideoHandler {
  @Post()
  async createMusicVideo(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateMusicVideoDto,
    @PathParam('id') id: string
  ) {
    await checkTaskUpdatePermissions(req, id);

    const baseArgs = buildCreateReleaseTaskArgs(body);

    const result = await prisma.releaseTask.create({
      data: {
        ...baseArgs,
        type: ReleaseTaskType.MUSIC_VIDEO,
        musicVideoData: { create: { url: body.url } },
        release: { connect: { id } },
      },
    });

    await createNewTaskEvent({ body, taskId: result.id, userId: req.session.token.sub });

    return result;
  }

  @Put()
  async updateMusicVideo(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateMusicVideoDto,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await checkTaskUpdatePermissions(req, id);

    const updateArgs = {
      ...buildUpdateReleaseTaskArgs(body),
      musicVideoData: { update: { url: body.url } },
    };

    const result = await prisma.releaseTask.update({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.MUSIC_VIDEO,
        },
      },
      data: updateArgs,
    });

    const activeTeamMember = await getResourceTeamMembership(req, releaseTeam?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    await createUpdateTaskEvents({
      body,
      taskId: result.id,
      userId: activeTeamMember?.id as string,
    });

    return result;
  }

  @Delete()
  async deleteMusicVideo(@Req() req: AuthDecoratedRequest, @PathParam('id') id: string) {
    await checkTaskUpdatePermissions(req, id);

    const result = await prisma.releaseTask.delete({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.MUSIC_VIDEO,
        },
      },
    });
    return result;
  }
}

export default createHandler(MusicVideoHandler);
