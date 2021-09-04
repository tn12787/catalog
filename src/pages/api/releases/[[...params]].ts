import {
  Body,
  createHandler,
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

import { Release, ReleaseTaskType, ReleaseType } from '@prisma/client';
import requiresAuth from 'backend/apiUtils/auth';
import prisma from 'backend/prisma/client';
import { UpdateReleaseDto } from 'backend/models/releases/update';
import { SortByOptions, SortOrder } from 'queries/types';

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
        tasks: true,
      },
    });
    return releases.map(({ tasks, ...release }) => ({
      ...release,
      artwork: tasks.find((task) => task.type === ReleaseTaskType.ARTWORK),
      mastering: tasks.find((task) => task.type === ReleaseTaskType.MASTERING),
      distribution: tasks.find(
        (task) => task.type === ReleaseTaskType.DISTRIBUTION
      ),
      musicVideo: tasks.find(
        (task) => task.type === ReleaseTaskType.MUSIC_VIDEO
      ),
    }));
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
        tasks: true,
      },
    });

    if (!release) throw new NotFoundException();

    const { tasks, ...rest } = release;

    return {
      ...rest,
      artwork: tasks.find((task) => task.type === ReleaseTaskType.ARTWORK),
      mastering: tasks.find((task) => task.type === ReleaseTaskType.MASTERING),
      distribution: tasks.find(
        (task) => task.type === ReleaseTaskType.DISTRIBUTION
      ),
      musicVideo: tasks.find(
        (task) => task.type === ReleaseTaskType.MUSIC_VIDEO
      ),
    };
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
