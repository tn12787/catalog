import {
  Body,
  createHandler,
  Delete,
  Post,
  Put,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { pickBy } from 'lodash';
import { NextApiRequest } from 'next';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { CreateMusicVideoDto } from 'backend/models/musicVideo/create';
import { UpdateMusicVideoDto } from 'backend/models/musicVideo/update';

@requiresAuth()
class MusicVideoHandler {
  @Post()
  async createMusicVideo(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: CreateMusicVideoDto,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
        targetDate: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);

    const optionalArgs = pickBy(
      {
        assignees: body.assignees
          ? {
              connect: body.assignees.map((id) => ({
                id,
              })),
            }
          : undefined,
        url: body.url,
        dueDate: body.dueDate,
      },
      (v) => v !== undefined
    );

    const result = await prisma.musicVideo.create({
      data: {
        ...optionalArgs,
        release: { connect: { id } },
        status: body.status,
        notes: body.notes,
      },
    });
    return result;
  }

  @Put()
  async updateMusicVideo(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: UpdateMusicVideoDto,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
        targetDate: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);

    const optionalArgs = pickBy(
      {
        assignees: body.assignees
          ? {
              set: body.assignees.map((id) => ({
                id,
              })),
            }
          : undefined,
        url: body.url,
        dueDate: body.dueDate,
      },
      (v) => v !== undefined
    );

    const result = await prisma.musicVideo.update({
      where: {
        releaseId: id,
      },
      data: {
        ...optionalArgs,
        status: body.status,
        notes: body.notes,
        dueDate: body.dueDate,
      },
    });
    return result;
  }

  @Delete()
  async deleteMusicVideo(@Req() req: NextApiRequest, @PathParam('id') id: string) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);

    const result = await prisma.musicVideo.delete({
      where: {
        releaseId: id,
      },
    });
    return result;
  }
}

export default createHandler(MusicVideoHandler);
