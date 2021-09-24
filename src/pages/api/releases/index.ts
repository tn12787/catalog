import {
  Body,
  createHandler,
  Get,
  HttpCode,
  Post,
  Query,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { Release, ReleaseType } from '@prisma/client';
import { pickBy } from 'lodash';
import { NextApiRequest } from 'next';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { CreateReleaseDto } from 'backend/models/releases/create';
import prisma from 'backend/prisma/client';
import { SortOrder } from 'queries/types';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';

@requiresAuth()
class ReleaseListHandler {
  @Get()
  async releases(
    @Query('team') team: string,
    @Query('search') search: string,
    @Query('sortBy') sortBy: keyof Release,
    @Query('sortOrder') sortOrder: SortOrder
  ) {
    const releases = await prisma.release.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
        team: { id: team },
      },
      orderBy: {
        [sortBy]: sortOrder ?? 'asc',
      },
      include: {
        artist: { select: { id: true, name: true } },
        artwork: { select: { url: true } },
      },
    });
    return releases;
  }

  @Post()
  @HttpCode(201)
  async createRelease(
    @Body(ValidationPipe) body: CreateReleaseDto,
    @Request() req: NextApiRequest
  ) {
    const team = await prisma.team.findUnique({ where: { id: body.team } });

    await checkRequiredPermissions(req, ['CREATE_RELEASES'], team?.id);

    const optionalArgs = pickBy(
      {
        artwork: body.artwork ? { create: { ...body.artwork } } : undefined,
        distribution: body.distribution
          ? {
              create: {
                ...body.distribution,
                distributor: { connect: { id: body.distribution.distributor } },
              },
            }
          : undefined,
      },
      (v) => v !== undefined
    );

    const result = await prisma.release.create({
      data: {
        artist: { connect: { id: body.artist } },
        name: body.name,
        type: body.type as ReleaseType,
        targetDate: body.targetDate,
        team: {
          connect: { id: body.team },
        },
        ...optionalArgs,
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
