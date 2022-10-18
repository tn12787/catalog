import {
  BadRequestException,
  Body,
  createHandler,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Patch,
  Req,
  ValidationPipe,
} from 'next-api-decorators';
import { endOfMonth, startOfMonth } from 'date-fns';

import type { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { UpdateReleaseDto } from 'backend/models/releases/update';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { getReleaseByIdIsomorphic } from 'backend/isomorphic/releases';
import { buildUpdateReleaseArgs } from 'backend/apiUtils/releases';
import { canUpdateReleaseToDate } from 'utils/releases';
import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';

@requiresAuth()
class SingleReleaseHandler {
  @Get()
  async singleRelease(@Req() req: AuthDecoratedRequest, @PathParam('releaseId') id: string) {
    return await getReleaseByIdIsomorphic(req, id);
  }

  @Patch()
  async updateRelease(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateReleaseDto,
    @PathParam('releaseId') id: string
  ) {
    if (!id) throw new NotFoundException();

    const existingRelease = await prisma.release.findUnique({
      where: { id },
      include: {
        tasks: { select: { dueDate: true } },
      },
    });

    if (!existingRelease) throw new NotFoundException();

    const workspace = await getWorkspaceByIdIsomorphic(req, existingRelease.workspaceId);
    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], workspace.id);

    const updateArgs = buildUpdateReleaseArgs(body);

    // check if there are any tasks with a due date after the new target date
    if (updateArgs.targetDate) {
      if (
        existingRelease?.tasks.some(({ dueDate }) => {
          if (!dueDate) return false;
          return new Date(updateArgs.targetDate as Date) < new Date(dueDate);
        })
      ) {
        throw new BadRequestException("Release date cannot be before any task's due date");
      }

      const releasesInTargetMonth = await prisma.release.count({
        where: {
          workspace: { id: existingRelease.workspaceId },
          targetDate: {
            gte: startOfMonth(new Date(body.targetDate)),
            lte: endOfMonth(new Date(body.targetDate)),
          },
        },
      });

      if (
        !canUpdateReleaseToDate(releasesInTargetMonth, workspace, existingRelease, body.targetDate)
      ) {
        throw new ForbiddenException('Monthly limit of releases reached.');
      }
    }

    const result = await prisma.release.update({
      where: {
        id,
      },
      data: {
        ...updateArgs,
      },
    });
    return result;
  }

  @Delete()
  async deleteRelease(@Req() req: AuthDecoratedRequest, @PathParam('releaseId') id: string) {
    const releaseWorkspace = await prisma.release.findUnique({
      where: { id },
      select: {
        workspaceId: true,
      },
    });

    await checkRequiredPermissions(req, ['DELETE_RELEASES'], releaseWorkspace?.workspaceId);

    const result = await prisma.release.delete({
      where: {
        id,
      },
    });
    return result;
  }
}

export default createHandler(SingleReleaseHandler);
