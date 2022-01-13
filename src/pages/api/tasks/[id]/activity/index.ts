import {
  Body,
  createHandler,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { NextApiRequest } from 'next';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { CreateArtistDto } from 'backend/models/artists/create';

@requiresAuth()
class SingleTaskHandler {
  @Get()
  async taskEvent(@Req() req: NextApiRequest, @PathParam('id') taskId: string) {
    if (!taskId) throw new NotFoundException();

    const task = await prisma.releaseTask.findUnique({
      where: { id: taskId },
      select: {
        release: { select: { teamId: true } },
      },
    });

    await checkRequiredPermissions(req, ['VIEW_RELEASES'], task?.release?.teamId);

    const activity = await prisma.releaseTaskEvent.findMany({
      where: {
        taskId: taskId,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    if (!activity) throw new NotFoundException();

    return activity;
  }

  @Post()
  @HttpCode(201)
  async createArtist(@Body(ValidationPipe) body: CreateArtistDto) {
    const result = await prisma.artist.create({
      data: {
        name: body.name,
        legalName: body.legalName,
        instagramUrl: body.instagramUrl,
        spotifyUrl: body.spotifyUrl,
        team: {
          connect: { id: body.team },
        },
      },
    });
    return result;
  }
}

export default createHandler(SingleTaskHandler);
