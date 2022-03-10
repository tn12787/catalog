import { Release } from '@prisma/client';
import {
  Body,
  createHandler,
  DefaultValuePipe,
  Get,
  HttpCode,
  Post,
  Query,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { ArtistResponse } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { CreateArtistDto } from 'backend/models/artists/create';
import prisma from 'backend/prisma/client';
import { SortOrder } from 'queries/types';

@requiresAuth()
class ArtistHandler {
  @Get()
  async artists(
    @Query('workspace') workspaceId: string,
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
  async createArtist(@Body(ValidationPipe) body: CreateArtistDto) {
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
