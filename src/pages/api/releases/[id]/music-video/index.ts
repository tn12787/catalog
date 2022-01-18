import {
  Body,
  createHandler,
  Delete,
  Post,
  Put,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { pickBy, isNil, pick } from 'lodash';
import { ReleaseTaskType } from '@prisma/client';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { CreateMusicVideoDto } from 'backend/models/musicVideo/create';
import { UpdateMusicVideoDto } from 'backend/models/musicVideo/update';
import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';
import { createNewTaskEvent } from 'backend/apiUtils/taskEvents';
import { AuthDecoratedRequest } from 'types';
import { buildCreateReleaseTaskArgs, checkTaskUpdatePermissions } from 'backend/apiUtils/tasks';

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
    await checkTaskUpdatePermissions(req, id);

    const updateArgs = {
      ...pick(body, ['dueDate', 'notes', 'status']),
      assignees: transformAssigneesToPrismaQuery(body.assignees),
      musicVideoData: {
        update: {
          url: body.url,
        },
      },
    };

    const result = await prisma.releaseTask.update({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.MUSIC_VIDEO,
        },
      },
      data: pickBy(updateArgs, (v) => !isNil(v)),
    });
    return result;
  }

  @Delete()
  async deleteMusicVideo(@Req() req: AuthDecoratedRequest, @PathParam('id') id: string) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);

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
