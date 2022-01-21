import {
  Body,
  createHandler,
  Delete,
  NotFoundException,
  Patch,
  Post,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { ReleaseTaskType } from '@prisma/client';

import { getResourceTeamMembership } from './../../../../../backend/apiUtils/teams/index';

import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { CreateArtworkDto } from 'backend/models/artwork/create';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateArtworkDto } from 'backend/models/artwork/update';
import { buildCreateTaskEvent, createUpdateTaskEvents } from 'backend/apiUtils/taskEvents';
import {
  buildCreateReleaseTaskArgs,
  buildUpdateReleaseTaskArgs,
  checkTaskUpdatePermissions,
} from 'backend/apiUtils/tasks';
import { ForbiddenException } from 'backend/apiUtils/exceptions';

@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createArtwork(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateArtworkDto,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await checkTaskUpdatePermissions(req, id);
    const activeTeamMember = await getResourceTeamMembership(req, releaseTeam?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    const baseArgs = buildCreateReleaseTaskArgs(body);

    const result = await prisma.releaseTask.create({
      data: {
        ...baseArgs,
        release: { connect: { id } },
        type: ReleaseTaskType.ARTWORK,
        artworkData: { create: { url: body.url } },
        events: {
          create: [
            buildCreateTaskEvent({
              userId: activeTeamMember.id,
            }),
          ],
        },
      },
    });

    return result;
  }

  @Patch()
  async updateArtwork(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateArtworkDto,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await checkTaskUpdatePermissions(req, id);

    const updateArgs = {
      ...buildUpdateReleaseTaskArgs(body),
      artworkData: { update: { url: body.url } },
    };

    const releaseTask = prisma.releaseTask.findUnique({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.ARTWORK,
        },
      },
    });

    if (!releaseTask) {
      throw new NotFoundException();
    }

    const activeTeamMember = await getResourceTeamMembership(req, releaseTeam?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    const eventsToCreate = await createUpdateTaskEvents({
      body,
      releaseId: id,
      type: ReleaseTaskType.ARTWORK,
      userId: activeTeamMember?.id as string,
    });

    await prisma.releaseTask.update({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.ARTWORK,
        },
      },
      data: { ...updateArgs, events: { create: eventsToCreate as any } }, // TODO: find a type for this
    });
  }

  @Delete()
  async deleteArtwork(@Req() req: AuthDecoratedRequest, @PathParam('id') id: string) {
    await checkTaskUpdatePermissions(req, id);

    const result = await prisma.releaseTask.delete({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.ARTWORK,
        },
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
