import { pickBy, isNil } from 'lodash';
import {
  Body,
  createHandler,
  Delete,
  Post,
  Patch,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { ReleaseTaskType } from '@prisma/client';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { CreateDistributionDto } from 'backend/models/distribution/create';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateDistributionDto } from 'backend/models/distribution/update';
import { AuthDecoratedRequest } from 'types';
import { createNewTaskEvent } from 'backend/apiUtils/taskEvents';
import {
  buildCreateReleaseTaskArgs,
  buildUpdateReleaseTaskArgs,
  checkTaskUpdatePermissions,
} from 'backend/apiUtils/tasks';

@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createDistribution(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateDistributionDto,
    @PathParam('id') id: string
  ) {
    await checkTaskUpdatePermissions(req, id);

    const baseArgs = buildCreateReleaseTaskArgs(body);

    const result = await prisma.releaseTask.create({
      data: {
        ...baseArgs,
        type: ReleaseTaskType.DISTRIBUTION,
        distributionData: { create: { distributor: { connect: { id: body.distributor } } } },
        release: { connect: { id } },
      },
    });

    await createNewTaskEvent({ body, taskId: result.id, userId: req.session.token.sub });

    return result;
  }

  @Patch()
  async updateDistribution(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateDistributionDto,
    @PathParam('id') id: string
  ) {
    await checkTaskUpdatePermissions(req, id);

    const updateArgs = {
      ...buildUpdateReleaseTaskArgs(body),
      distributionData: {
        update: {
          distributor: body.distributor ? { connect: { id: body.distributor } } : undefined,
        },
      },
    };

    const result = await prisma.releaseTask.update({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.DISTRIBUTION,
        },
      },
      data: pickBy(updateArgs, (v) => !isNil(v)),
    });

    return result;
  }

  @Delete()
  async deleteDistribution(@Req() req: AuthDecoratedRequest, @PathParam('id') id: string) {
    await checkTaskUpdatePermissions(req, id);

    const result = await prisma.releaseTask.delete({
      where: {
        releaseId_type: {
          releaseId: id,
          type: ReleaseTaskType.DISTRIBUTION,
        },
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
