import {
  Body,
  createHandler,
  DefaultValuePipe,
  Get,
  HttpCode,
  ParseDatePipe,
  ParseNumberPipe,
  Post,
  Query,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { Release, ReleaseType, ReleaseTaskType, TaskStatus } from '@prisma/client';
import { pickBy } from 'lodash';

import { buildCreateReleaseTaskArgs } from 'backend/apiUtils/tasks';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { CreateReleaseDto } from 'backend/models/releases/create';
import prisma from 'backend/prisma/client';
import { SortOrder } from 'queries/types';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { transformReleaseToApiShape } from 'backend/apiUtils/transforms/releases';
import { AuthDecoratedRequest } from 'types/common';
import { RequiredQuery } from 'backend/apiUtils/decorators/routing';

@requiresAuth()
class ReleaseListHandler {
  @Get()
  async releases(
    @RequiredQuery('workspace') workspace: string,
    @Query('search') search: string,
    @Query('sortBy', DefaultValuePipe<keyof Release>('targetDate')) sortBy: keyof Release,
    @Query('sortOrder', DefaultValuePipe(SortOrder.ASC)) sortOrder: SortOrder,
    @Query('pageSize', ParseNumberPipe({ nullable: true }), DefaultValuePipe(10)) pageSize: number,
    @Query('page', ParseNumberPipe({ nullable: true }), DefaultValuePipe(1)) page: number,
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
        workspace: { id: workspace },
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
              contacts: { include: { labels: true } },
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
    const workspace = await prisma.workspace.findUnique({ where: { id: body.workspace } });

    await checkRequiredPermissions(req, ['CREATE_RELEASES'], workspace?.id);

    const optionalArgs = [
      body.artwork &&
        buildCreateReleaseTaskArgs({
          ...body.artwork,
          type: ReleaseTaskType.ARTWORK,
          dueDate: body.artwork?.dueDate ?? new Date(),
          status: body.artwork?.status as TaskStatus,
        }),
      body.distribution &&
        buildCreateReleaseTaskArgs({
          ...body.distribution,
          type: ReleaseTaskType.DISTRIBUTION,
          dueDate: body.distribution?.dueDate ?? new Date(),
          status: body.distribution?.status as TaskStatus,
        }),
    ].filter(Boolean) as any; // TODO: Find a type for this

    const result = await prisma.release.create({
      data: {
        artist: { connect: { id: body.artist } },
        name: body.name,
        type: body.type as ReleaseType,
        targetDate: body.targetDate,
        workspace: {
          connect: { id: body.workspace },
        },
        tasks: { create: optionalArgs },
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
