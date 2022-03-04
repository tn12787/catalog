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

import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import prisma from 'backend/prisma/client';
import { UpdateArtistDto } from 'backend/models/artists/update';
import { getArtistByIdIsomorphic } from 'backend/isomorphic/artists';

@requiresAuth()
class ArtistHandler {
  @Get()
  async singleArtist(@Req() req: AuthDecoratedRequest, @Query('id') id: string) {
    return await getArtistByIdIsomorphic(req, id);
  }

  @Put()
  async updateArtist(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateArtistDto,
    @PathParam('id') id: string
  ) {
    if (!id) throw new NotFoundException();

    const artist = await prisma.artist.findUnique({
      where: { id },
      select: {
        workspaceId: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_ARTISTS'], artist?.workspaceId);

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
  async deleteArtist(@Req() req: AuthDecoratedRequest, @PathParam('id') id: string) {
    const artist = await prisma.artist.findUnique({
      where: { id },
      select: {
        workspaceId: true,
      },
    });

    await checkRequiredPermissions(req, ['DELETE_ARTISTS'], artist?.workspaceId);

    const result = await prisma.artist.delete({
      where: {
        id,
      },
    });
    return result;
  }
}

export default createHandler(ArtistHandler);
