import {
  Body,
  createHandler,
  Delete,
  Post,
  Put,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { pick, pickBy, isNil } from 'lodash';
import { ReleaseTaskType } from '@prisma/client';

import { AuthDecoratedRequest } from './../../../../../types/index';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { CreateMasteringDto } from 'backend/models/mastering/create';
import { UpdateMasteringDto } from 'backend/models/mastering/update';
import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';
import { createNewTaskEvent } from 'backend/apiUtils/taskEvents';
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
      },
    });

    await createNewTaskEvent({ body, taskId: result.id, userId: req.session.token.sub });

    return result;
  }

  @Put()
  async updateMastering(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateMasteringDto,
    @PathParam('id') id: string
  ) {
    await checkTaskUpdatePermissions(req, id);

    const updateArgs = {
      ...pick(body, ['dueDate', 'notes', 'status']),
      assignees: transformAssigneesToPrismaQuery(body.assignees),
      masteringData: {
        update: {
          url: body.url,
        },
      },
    };

    const result = await prisma.releaseTask.update({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.MASTERING,
        },
      },
      data: pickBy(updateArgs, (v) => !isNil(v)),
    });
    return result;
  }

  @Delete()
  async deleteMastering(@Req() req: AuthDecoratedRequest, @PathParam('id') id: string) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);

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
