import { pickBy } from 'lodash';
import {
  Body,
  createHandler,
  Delete,
  Get,
  NotFoundException,
  Put,
  Query,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { NextApiRequest } from 'next';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import prisma from 'backend/prisma/client';
import { UpdateArtistDto } from 'backend/models/artists/update';

@requiresAuth()
class ArtistHandler {
  @Get()
  async singleArtist(@Query('id') id: string) {
    if (!id) throw new NotFoundException();

    const artist = await prisma.artist.findUnique({
      where: {
        id,
      },
      include: { releases: { include: { artwork: true } } },
    });
    return artist;
  }

  @Put()
  async updateArtist(@Body(ValidationPipe) body: UpdateArtistDto, @PathParam('id') id: string) {
    if (!id) throw new NotFoundException();

    const optionalArgs = pickBy(
      {
        legalName: body.legalName,
        spotifyUrl: body.spotifyUrl,
      },
      (v) => v !== undefined
    );

    const result = await prisma.artist.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        legalName: body.legalName,
        ...optionalArgs,
      },
    });
    return result;
  }

  @Delete()
  async deleteArtist(@Req() req: NextApiRequest, @PathParam('id') id: string) {
    const artist = await prisma.artist.findUnique({
      where: { id },
      select: {
        teamId: true,
      },
    });

    await checkRequiredPermissions(req, ['DELETE_ARTISTS'], artist?.teamId);

    const result = await prisma.artist.delete({
      where: {
        id,
      },
    });
    return result;
  }
}

export default createHandler(ArtistHandler);
