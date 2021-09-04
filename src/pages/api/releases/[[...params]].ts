import {
  Body,
  createHandler,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { CreateReleaseDto } from 'backend/models/releases/create';

import { ReleaseType } from '@prisma/client';
import requiresAuth from 'backend/apiUtils/auth';
import prisma from 'backend/prisma/client';
import { UpdateReleaseDto } from 'backend/models/releases/update';

@requiresAuth()
class ReleaseListHandler {
  @Get()
  async releases() {
    const releases = await prisma.release.findMany({
      orderBy: {
        targetDate: 'asc',
      },
      include: {
        artist: true,
        tasks: true,
      },
    });
    return releases;
  }

  @Get('/:id')
  async singleRelease(@Param('id') id: string) {
    if (!id) throw new NotFoundException();

    const releaseData = await prisma.release.findUnique({
      where: {
        id,
      },
      include: {
        artist: true,
        tasks: true,
      },
    });
    return releaseData;
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
}

export default createHandler(ReleaseListHandler);
