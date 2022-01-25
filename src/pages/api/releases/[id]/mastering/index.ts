import { Body, createHandler, Post, Req, ValidationPipe } from '@storyofams/next-api-decorators';
import { ReleaseTaskType } from '@prisma/client';

import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { CreateMasteringDto } from 'backend/models/mastering/create';
import { buildCreateTaskEvent } from 'backend/apiUtils/taskEvents';
import { buildCreateReleaseTaskArgs, checkTaskUpdatePermissions } from 'backend/apiUtils/tasks';

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
}

export default createHandler(MasteringHandler);
