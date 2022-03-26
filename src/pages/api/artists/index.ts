import { Release } from '@prisma/client';
import {
  Body,
  createHandler,
  DefaultValuePipe,
  ForbiddenException,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseMiddleware,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
import { AuthDecoratedRequest } from 'types/auth';
import { canAddAnotherArtist } from 'utils/artists';
import { RequiredQuery } from 'backend/apiUtils/decorators/routing';
import { ArtistResponse } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { CreateArtistDto } from 'backend/models/artists/create';
import prisma from 'backend/prisma/client';
import { SortOrder } from 'queries/types';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
class ArtistHandler {
  @Get()
  async artists(
    @RequiredQuery('workspace') workspaceId: string,
    @Query('search') search: string,
    @Query('sortBy', DefaultValuePipe<keyof Release>('name')) sortBy: keyof ArtistResponse,
    @Query('sortOrder', DefaultValuePipe(SortOrder.ASC)) sortOrder: SortOrder
  ) {
    const orderBy =
      sortBy === 'releases'
        ? {
            releases: {
              _count: sortOrder,
            },
          }
        : {
            [sortBy]: sortOrder,
          };

    const artists = await prisma.artist.findMany({
      where: {
        workspace: {
          id: workspaceId,
        },
        name: { contains: search, mode: 'insensitive' } as any,
      },
      orderBy,
      include: {
        releases: {
          select: { name: true },
        },
      },
    });
    return artists;
  }

  @Post()
  @HttpCode(201)
  async createArtist(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateArtistDto
  ) {
    await checkRequiredPermissions(req, ['CREATE_ARTISTS'], body.workspace);

    const artists = await prisma.artist.count({ where: { workspace: { id: body.workspace } } });
    const workspace = await getWorkspaceByIdIsomorphic(req, body.workspace);

    if (!canAddAnotherArtist(artists, workspace)) {
      throw new ForbiddenException(
        "You cannot add any more artists to this workspace. Please upgrade this workspace's plan to add more."
      );
    }

    const result = await prisma.artist.create({
      data: {
        name: body.name,
        legalName: body.legalName,
        instagramUsername: body.instagramUsername,
        tiktokUsername: body.tiktokUsername,
        spotifyId: body.spotifyId,
        imageUrl: body.imageUrl,
        linkTreeUrl: body.linkTreeUrl,
        workspace: {
          connect: { id: body.workspace },
        },
      },
    });
    return result;
  }
}

export default createHandler(ArtistHandler);
