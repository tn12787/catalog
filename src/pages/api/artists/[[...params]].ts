import {
  Body,
  createHandler,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { CreateArtistDto } from 'backend/models/artists/create';

import { ReleaseType } from '@prisma/client';
import requiresAuth from 'backend/apiUtils/auth';
import prisma from 'backend/prisma/client';

@requiresAuth()
class ArtistHandler {
  @Get()
  async artists() {
    const artists = await prisma.artist.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return artists;
  }

  @Get('/:id')
  async singleArtist(@Param('id') id: string) {
    if (!id) throw new NotFoundException();

    const artist = await prisma.artist.findUnique({
      where: {
        id,
      },
    });
    return artist;
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