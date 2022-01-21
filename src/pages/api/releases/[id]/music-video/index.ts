import {
  Body,
  createHandler,
  Delete,
  Patch,
  Post,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { ReleaseTaskType } from '@prisma/client';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { CreateMusicVideoDto } from 'backend/models/musicVideo/create';
import { UpdateMusicVideoDto } from 'backend/models/musicVideo/update';
import { buildCreateTaskEvent, createUpdateTaskEvents } from 'backend/apiUtils/taskEvents';
import { AuthDecoratedRequest } from 'types/common';
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
    const releaseTeam = await checkTaskUpdatePermissions(req, id);

    const baseArgs = buildCreateReleaseTaskArgs(body);
    const activeTeamMember = await getResourceTeamMembership(req, releaseTeam?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    const result = await prisma.releaseTask.create({
      data: {
        ...baseArgs,
        type: ReleaseTaskType.MUSIC_VIDEO,
        musicVideoData: { create: { url: body.url } },
        release: { connect: { id } },
        events: { create: [buildCreateTaskEvent({ userId: activeTeamMember.id })] },
      },
    });

    return result;
  }

  @Patch()
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

    const activeTeamMember = await getResourceTeamMembership(req, releaseTeam?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    const createdEvents = await createUpdateTaskEvents({
      body,
      releaseId: id,
      type: ReleaseTaskType.MUSIC_VIDEO,
      userId: activeTeamMember?.id as string,
    });

    const result = await prisma.releaseTask.update({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.MUSIC_VIDEO,
        },
      },
      data: { ...updateArgs, events: createdEvents as any },
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
