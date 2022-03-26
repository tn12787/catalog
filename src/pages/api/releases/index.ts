import {
  Body,
  createHandler,
  DefaultValuePipe,
  ForbiddenException,
  Get,
  HttpCode,
  ParseDatePipe,
  ParseNumberPipe,
  Post,
  Query,
  Request,
  UseMiddleware,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { Release, ReleaseType, ReleaseTaskType, TaskStatus } from '@prisma/client';
import { pickBy } from 'lodash';
import { endOfMonth, startOfMonth } from 'date-fns';

import { canAddAnotherRelease } from 'utils/releases';
import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
import { AuthDecoratedRequest } from 'types/auth';
import { buildCreateReleaseTaskArgs } from 'backend/apiUtils/tasks';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { CreateReleaseDto } from 'backend/models/releases/create';
import prisma from 'backend/prisma/client';
import { SortOrder } from 'queries/types';
import {
  checkRequiredPermissions,
  getResourceWorkspaceMembership,
} from 'backend/apiUtils/workspaces';
import { transformReleaseToApiShape } from 'backend/apiUtils/transforms/releases';
import { RequiredQuery } from 'backend/apiUtils/decorators/routing';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
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
    const workspace = await getWorkspaceByIdIsomorphic(req, body.workspace);

    await checkRequiredPermissions(req, ['CREATE_RELEASES'], workspace.id);

    const releasesInTargetMonth = await prisma.release.count({
      where: {
        workspace: { id: body.workspace },
        targetDate: {
          gte: startOfMonth(new Date(body.targetDate)),
          lte: endOfMonth(new Date(body.targetDate)),
        },
      },
    });

    if (!canAddAnotherRelease(releasesInTargetMonth, workspace)) {
      throw new ForbiddenException('Monthly limit of releases reached.');
    }

    const activeWorkspaceMember = await getResourceWorkspaceMembership(req, workspace.id);

    const optionalArgs = [
      body.artwork &&
        buildCreateReleaseTaskArgs(workspace, {
          ...body.artwork,
          type: ReleaseTaskType.ARTWORK,
          dueDate: body.artwork?.dueDate ?? new Date(),
          status: body.artwork?.status as TaskStatus,
          userId: activeWorkspaceMember.id,
        }),
      body.distribution &&
        buildCreateReleaseTaskArgs(workspace, {
          ...body.distribution,
          type: ReleaseTaskType.DISTRIBUTION,
          dueDate: body.distribution?.dueDate ?? new Date(),
          status: body.distribution?.status as TaskStatus,
          userId: activeWorkspaceMember.id,
        }),
      body.mastering &&
        buildCreateReleaseTaskArgs(workspace, {
          ...body.mastering,
          type: ReleaseTaskType.MASTERING,
          dueDate: body.mastering?.dueDate ?? new Date(),
          status: body.mastering?.status as TaskStatus,
          userId: activeWorkspaceMember.id,
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
