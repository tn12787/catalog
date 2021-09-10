import {
  createHandler,
  Get,
  NotFoundException,
  Query,
} from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
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
