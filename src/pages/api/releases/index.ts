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
          artwork: { select: { url: true } },
        },
        orderBy: sortBy
          ? {
              [sortBy]: sortOrder,
            }
          : undefined,
      }),
      prisma.release.count(commonArgs),
    ]);

    return { total: totalCount, results: releases };
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
