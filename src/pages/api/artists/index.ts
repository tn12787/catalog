import {
  Body,
  createHandler,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { ReleaseType } from '@prisma/client';

import requiresAuth from 'backend/apiUtils/decorators/auth';
import { CreateArtistDto } from 'backend/models/artists/create';
import prisma from 'backend/prisma/client';

@requiresAuth()
class ArtistHandler {
  @Get()
  async artists(@Query('team') teamId: string) {
    const artists = await prisma.artist.findMany({
      where: {
        team: {
          id: teamId,
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
        team: {
          connect: { id: body.team },
        },
      },
    });
    return result;
  }
}

export default createHandler(ArtistHandler);
