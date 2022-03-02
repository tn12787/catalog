import {
  BadRequestException,
  Body,
  createHandler,
  Delete,
  Get,
  NotFoundException,
  Put,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { ReleaseType } from '@prisma/client';

import { AuthDecoratedRequest } from 'types/common';
import { transformReleaseToApiShape } from 'backend/apiUtils/transforms/releases';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { UpdateReleaseDto } from 'backend/models/releases/update';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';

@requiresAuth()
class SingleReleaseHandler {
  @Get()
  async singleRelease(@Req() req: AuthDecoratedRequest, @PathParam('id') id: string) {
    if (!id) throw new NotFoundException();

    const releaseWorkspace = await prisma.release.findUnique({
      where: { id },
      select: {
        workspaceId: true,
      },
    });

    await checkRequiredPermissions(req, ['VIEW_RELEASES'], releaseWorkspace?.workspaceId);

    const release = await prisma.release.findUnique({
      where: {
        id,
      },
      include: {
        artist: true,
        tasks: {
          include: {
            assignees: { include: { user: true } },
            contacts: { include: { labels: true } },
            artworkData: true,
            distributionData: { include: { distributor: true } },
            marketingData: { include: { links: true } },
            musicVideoData: true,
            masteringData: true,
          },
        },
      },
    });

    if (!release) throw new NotFoundException();

    return transformReleaseToApiShape(release);
  }

  @Put()
  async updateRelease(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateReleaseDto,
    @PathParam('id') id: string
  ) {
    if (!id) throw new NotFoundException();

    const releaseWorkspace = await prisma.release.findUnique({
      where: { id },
      select: {
        workspaceId: true,
        tasks: { select: { dueDate: true } },
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseWorkspace?.workspaceId);

    if (!releaseWorkspace) throw new NotFoundException();

    // check if there are any tasks with a due date after the new target date
    if (body.targetDate) {
      if (
        releaseWorkspace?.tasks.some(({ dueDate }) => {
          if (!dueDate) return false;
          return new Date(body.targetDate) < new Date(dueDate);
        })
      ) {
        throw new BadRequestException("Release target date cannot be before any task's due date");
      }
    }

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

  @Delete()
  async deleteRelease(@Req() req: AuthDecoratedRequest, @PathParam('id') id: string) {
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
