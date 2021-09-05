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

import { CreateReleaseDto } from 'backend/models/releases/create';

import { Release, ReleaseType } from '@prisma/client';
import requiresAuth from 'backend/apiUtils/auth';
import prisma from 'backend/prisma/client';
import { UpdateReleaseDto } from 'backend/models/releases/update';
import { SortOrder } from 'queries/types';
import { CreateDistributionDto } from 'backend/models/distribution/create';
import { CreateArtworkDto } from 'backend/models/artwork/create';
import { pickBy } from 'lodash';

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

  @Get('/:id')
  async singleRelease(@Param('id') id: string) {
    if (!id) throw new NotFoundException();

    const release = await prisma.release.findUnique({
      where: {
        id,
      },
      include: {
        artist: true,
        artwork: true,
        distribution: { include: { distributor: true } },
        marketing: true,
        musicVideo: true,
      },
    });

    return release;
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

  @Put('/:id')
  async updateRelease(
    @Param('id') id: string,
    @Body(ValidationPipe) body: UpdateReleaseDto
  ) {
    if (!id) throw new NotFoundException();

    const result = await prisma.release.update({
      where: {
        id,
      },
      data: {
        artist: { connect: { id: body.artist } },
        name: body.name,
        type: body.type as ReleaseType,
        targetDate: body.targetDate,
      },
    });
    return result;
  }

  @Delete('/:id')
  async deleteRelease(@Param('id') id: string) {
    const result = await prisma.release.delete({
      where: {
        id,
      },
    });
    return result;
  }

  @Post('/:id/distribution')
  async createDistribution(
    @Param('id') id: string,
    @Body(ValidationPipe) body: CreateDistributionDto
  ) {
    const optionalArgs = body.assignee
      ? { assignee: { connect: { id: body.assignee } } }
      : {};
    const result = await prisma.distribution.create({
      data: {
        ...optionalArgs,
        distributor: { connect: { id: body.distributor } },
        release: { connect: { id } },
        status: body.status,
        notes: body.notes,
        dueDate: body.dueDate,
      },
    });
    return result;
  }

  @Put('/:id/distribution')
  async updateDistribution(
    @Param('id') id: string,
    @Body(ValidationPipe) body: CreateDistributionDto
  ) {
    const optionalArgs = body.assignee
      ? { assignee: { connect: { id: body.assignee } } }
      : {};
    const result = await prisma.distribution.update({
      where: {
        releaseId: id,
      },
      data: {
        ...optionalArgs,
        distributor: { connect: { id: body.distributor } },
        status: body.status,
        notes: body.notes,
        dueDate: body.dueDate,
      },
    });
    return result;
  }

  @Delete('/:id/distribution')
  async deleteDistribution(@Param('id') id: string) {
    const result = await prisma.distribution.delete({
      where: {
        releaseId: id,
      },
    });
    return result;
  }

  @Post('/:id/artwork')
  async createArtwork(
    @Param('id') id: string,
    @Body(ValidationPipe) body: CreateArtworkDto
  ) {
    console.log(body);
    const optionalArgs = pickBy(
      {
        assignee: body.assignee
          ? { connect: { id: body.assignee } }
          : undefined,
        url: body.url,
      },
      (v) => v !== undefined
    );
    const result = await prisma.artwork.create({
      data: {
        ...optionalArgs,
        release: { connect: { id } },
        status: body.status,
        notes: body.notes,
        dueDate: body.dueDate,
      },
    });
    return result;
  }

  @Put('/:id/artwork')
  async updateArtwork(
    @Param('id') id: string,
    @Body(ValidationPipe) body: CreateArtworkDto
  ) {
    const optionalArgs = pickBy(
      {
        assignee: body.assignee
          ? { connect: { id: body.assignee } }
          : undefined,
        url: body.url,
      },
      (v) => v !== undefined
    );

    const result = await prisma.artwork.update({
      where: {
        releaseId: id,
      },
      data: {
        ...optionalArgs,
        status: body.status,
        notes: body.notes,
        dueDate: body.dueDate,
      },
    });
    return result;
  }

  @Delete('/:id/artwork')
  async deleteArtwork(@Param('id') id: string) {
    const result = await prisma.artwork.delete({
      where: {
        releaseId: id,
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
