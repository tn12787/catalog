import {
  Body,
  createHandler,
  Delete,
  Patch,
  Post,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { pickBy, isNil, pick } from 'lodash';
import { ReleaseTaskType } from '@prisma/client';

import { AuthDecoratedRequest } from 'types';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { CreateArtworkDto } from 'backend/models/artwork/create';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { UpdateArtworkDto } from 'backend/models/artwork/update';
import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';
import { createNewTaskEvent } from 'backend/apiUtils/taskEvents';
import { buildCreateReleaseTaskArgs, checkTaskUpdatePermissions } from 'backend/apiUtils/tasks';

@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createArtwork(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateArtworkDto,
    @PathParam('id') id: string
  ) {
    await checkTaskUpdatePermissions(req, id);

    const baseArgs = buildCreateReleaseTaskArgs(body);

    const result = await prisma.releaseTask.create({
      data: {
        ...baseArgs,
        release: { connect: { id } },
        type: ReleaseTaskType.ARTWORK,
        artworkData: { create: { url: body.url } },
      },
    });

    await createNewTaskEvent({ body, taskId: result.id, userId: req.session.token.sub });

    return result;
  }

  @Patch()
  async updateArtwork(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateArtworkDto,
    @PathParam('id') id: string
  ) {
    await checkTaskUpdatePermissions(req, id);

    const updateArgs = {
      ...pick(body, ['status', 'notes', 'dueDate']),
      assignees: transformAssigneesToPrismaQuery(body.assignees),
      artworkData: {
        update: {
          url: body.url,
        },
      },
    };

    const result = await prisma.releaseTask.update({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.ARTWORK,
        },
      },
      data: pickBy(updateArgs, (v) => !isNil(v)),
    });

    return result;
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
