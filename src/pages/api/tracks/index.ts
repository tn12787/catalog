import { createHandler, Get, Query, Req } from 'next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { RequiredQuery } from 'backend/apiUtils/decorators/routing';
import type { AuthDecoratedRequest } from 'types/auth';
import { getResourceWorkspaceMembership } from 'backend/apiUtils/workspaces';

@requiresAuth()
class TrackListHandler {
  @Get()
  async releases(
    @Req() req: AuthDecoratedRequest,
    @RequiredQuery('workspace') workspace: string,
    @Query('search') search: string
    // @Query('sortBy', DefaultValuePipe<keyof Release>('targetDate')) sortBy: keyof Release,
    // @Query('sortOrder', DefaultValuePipe(SortOrder.ASC)) sortOrder: SortOrder,
    // @Query('pageSize', ParseNumberPipe({ nullable: true }), DefaultValuePipe(10)) pageSize: number,
    // @Query('page', ParseNumberPipe({ nullable: true }), DefaultValuePipe(1)) page: number,
    // @Query('before', ParseDatePipe({ nullable: true })) before: Date,
    // @Query('after', ParseDatePipe({ nullable: true })) after: Date
  ) {
    // const dateArgs = pickBy(
    //   {
    //     gte: after,
    //     lt: before,
    //   },
    //   (v) => v !== undefined
    // );

    await getResourceWorkspaceMembership(req, workspace);

    const commonArgs = {
      where: {
        // targetDate: { ...dateArgs },
        name: { contains: search, mode: 'insensitive' } as any,
        workspace: { id: workspace },
      },
    };

    const tracks = await prisma.track.findMany({
      ...commonArgs,
      // skip: pageSize * (page - 1),
      // take: pageSize,
      include: {
        mainArtists: { select: { id: true, name: true } },
        featuringArtists: { select: { id: true, name: true } },
      },
      // orderBy: sortBy
      //   ? {
      //       [sortBy]: sortOrder,
      //     }
      //   : undefined,
    });

    return {
      results: tracks,
    };
  }
}
export default createHandler(TrackListHandler);
