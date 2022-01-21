import {
  Body,
  createHandler,
  DefaultValuePipe,
  Get,
  HttpCode,
  ParseDatePipe,
  Post,
  Query,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { Release, ReleaseType, ReleaseTaskType } from '@prisma/client';
import { pickBy } from 'lodash';
import { omit } from 'lodash';

import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { CreateReleaseDto } from 'backend/models/releases/create';
import prisma from 'backend/prisma/client';
import { SortOrder } from 'queries/types';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { transformReleaseToApiShape } from 'backend/apiUtils/transforms/releases';
import { AuthDecoratedRequest } from 'types/common';

@requiresAuth()
class ReleaseListHandler {
  @Get()
  async releases(
    @Query('team') team: string,
    @Query('search') search: string,
    @Query('sortBy', DefaultValuePipe<keyof Release>('targetDate')) sortBy: keyof Release,
    @Query('sortOrder', DefaultValuePipe(SortOrder.ASC)) sortOrder: SortOrder,
    @Query('pageSize', DefaultValuePipe(10)) pageSize: number,
    @Query('page', DefaultValuePipe(1)) page: number,
    @Query('before', ParseDatePipe({ nullable: true })) before: Date,
    @Query('after', ParseDatePipe({ nullable: true })) after: Date
  ) {
    const dateArgs = pickBy(
      {
        gte: after,
        lt: before,
      },
      (v) => v !== undefined
    );

    const commonArgs = {
      where: {
        targetDate: { ...dateArgs },
        name: { contains: search, mode: 'insensitive' } as any,
        team: { id: team },
      },
    };

    const [releases, totalCount] = await prisma.$transaction([
      prisma.release.findMany({
        ...commonArgs,
        skip: pageSize * (page - 1),
        take: pageSize,
        include: {
          artist: { select: { id: true, name: true } },
          tasks: {
            include: {
              assignees: { include: { user: true } },
              artworkData: true,
              distributionData: { include: { distributor: true } },
              masteringData: true,
              marketingData: { include: { links: true } },
              musicVideoData: true,
            },
          },
        },
        orderBy: sortBy
          ? {
              [sortBy]: sortOrder,
            }
          : undefined,
      }),
      prisma.release.count(commonArgs),
    ]);

    return {
      total: totalCount,
      results: releases.map((release) => transformReleaseToApiShape(release)),
    };
  }

  @Post()
  @HttpCode(201)
  async createRelease(
    @Body(ValidationPipe) body: CreateReleaseDto,
    @Request() req: AuthDecoratedRequest
  ) {
    const team = await prisma.team.findUnique({ where: { id: body.team } });

    await checkRequiredPermissions(req, ['CREATE_RELEASES'], team?.id);

    const optionalArgs = [
      body.artwork && {
        ...omit(body.artwork, 'url'),
        assignees: transformAssigneesToPrismaQuery(body.artwork.assignees, true),
        type: ReleaseTaskType.ARTWORK,
        artworkData: {
          create: {
            url: body.artwork.url,
          },
        },
      },
      body.distribution && {
        ...omit(body.distribution, 'distributor'),
        type: ReleaseTaskType.DISTRIBUTION,
        assignees: transformAssigneesToPrismaQuery(body.distribution.assignees, true),
        distributionData: {
          create: { distributor: { connect: { id: body.distribution.distributor } } },
        },
      },
    ].filter(Boolean) as any; // TODO: Find a type for this

    const result = await prisma.release.create({
      data: {
        artist: { connect: { id: body.artist } },
        name: body.name,
        type: body.type as ReleaseType,
        targetDate: body.targetDate,
        team: {
          connect: { id: body.team },
        },
        tasks: { create: optionalArgs },
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
