import {
  Body,
  createHandler,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { Release, ReleaseType } from '@prisma/client';
import { pickBy } from 'lodash';

import { CreateReleaseDto } from 'backend/models/releases/create';
import requiresAuth from 'backend/apiUtils/auth';
import prisma from 'backend/prisma/client';
import { UpdateReleaseDto } from 'backend/models/releases/update';
import { SortOrder } from 'queries/types';
import { CreateDistributionDto } from 'backend/models/distribution/create';
import { CreateArtworkDto } from 'backend/models/artwork/create';


@requiresAuth()
class ReleaseListHandler {
  @Get()
  async releases(
    @Query('search') search: string,
    @Query('sortBy') sortBy: keyof Release,
    @Query('sortOrder') sortOrder: SortOrder
  ) {
    const releases = await prisma.release.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
      },
      orderBy: {
        [sortBy]: sortOrder ?? 'asc',
      },
      include: {
        artist: true,
        artwork: true,
      },
    });
    return releases;
  }

  @Post()
  @HttpCode(201)
  async createRelease(@Body(ValidationPipe) body: CreateReleaseDto) {
    const result = await prisma.release.create({
      data: {
        artist: { connect: { id: body.artist } },
        name: body.name,
        type: body.type as ReleaseType,
        targetDate: body.targetDate,
        team: {
          connect: { id: body.team },
        },
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
