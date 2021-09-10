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
  async singleArtist(@Query('id') id: string) {
    if (!id) throw new NotFoundException();

    const artist = await prisma.artist.findUnique({
      where: {
        id,
      },
      include: { releases: true },
    });
    return artist;
  }
}

export default createHandler(ArtistHandler);
