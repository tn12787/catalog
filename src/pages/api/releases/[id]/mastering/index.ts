import {
  Body,
  createHandler,
  Delete,
  Patch,
  Post,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { ReleaseTaskType } from '@prisma/client';

import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { CreateMasteringDto } from 'backend/models/mastering/create';
import { UpdateMasteringDto } from 'backend/models/mastering/update';
import { buildCreateTaskEvent, createUpdateTaskEvents } from 'backend/apiUtils/taskEvents';
import {
  buildCreateReleaseTaskArgs,
  buildUpdateReleaseTaskArgs,
  checkTaskUpdatePermissions,
} from 'backend/apiUtils/tasks';
import { ForbiddenException } from 'backend/apiUtils/exceptions';
import { getResourceTeamMembership } from 'backend/apiUtils/teams';

@requiresAuth()
class MasteringHandler {
  @Post()
  async createMastering(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateMasteringDto,
    @PathParam('id') id: string
  ) {
    await checkTaskUpdatePermissions(req, id);

    const baseArgs = buildCreateReleaseTaskArgs(body);

    const result = await prisma.releaseTask.create({
      data: {
        ...baseArgs,
        type: ReleaseTaskType.MASTERING,
        masteringData: { create: { url: body.url } },
        release: { connect: { id } },
        events: {
          create: [buildCreateTaskEvent({ userId: req.session.token.sub })],
        },
      },
    });

    return result;
  }

  @Patch()
  async updateMastering(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateMasteringDto,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await checkTaskUpdatePermissions(req, id);

    const updateArgs = {
      ...buildUpdateReleaseTaskArgs(body),
      masteringData: { update: { url: body.url } },
    };

    const activeTeamMember = await getResourceTeamMembership(req, releaseTeam?.teamId);
    if (!activeTeamMember) throw new ForbiddenException();

    const createdEvents = await createUpdateTaskEvents({
      body,
      releaseId: id,
      type: ReleaseTaskType.MASTERING,
      userId: activeTeamMember?.id as string,
    });

    const result = await prisma.releaseTask.update({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.MASTERING,
        },
      },
      data: { ...updateArgs, events: { create: createdEvents as any[] } }, //todo: fix type,
    });

    return result;
  }

  @Delete()
  async deleteMastering(@Req() req: AuthDecoratedRequest, @PathParam('id') id: string) {
    await checkTaskUpdatePermissions(req, id);

    const result = await prisma.releaseTask.delete({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.MASTERING,
        },
      },
    });
    return result;
  }
}

export default createHandler(MasteringHandler);
