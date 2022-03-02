import {
  Body,
  createHandler,
  Get,
  HttpCode,
  Post,
  Query,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { CreateArtistDto } from 'backend/models/artists/create';
import prisma from 'backend/prisma/client';

@requiresAuth()
class ArtistHandler {
  @Get()
  async artists(@Query('workspace') workspaceId: string) {
    const artists = await prisma.artist.findMany({
      where: {
        workspace: {
          id: workspaceId,
        },
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        _count: {
          select: { releases: true },
        },
      },
    });
    return artists;
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
        workspace: {
          connect: { id: body.team },
        },
      },
    });
    return result;
  }
}

export default createHandler(ArtistHandler);
