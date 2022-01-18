import { pickBy, isNil, pick } from 'lodash';
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
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { UpdateDistributionDto } from 'backend/models/distribution/update';
import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';
import { AuthDecoratedRequest } from 'types';
import { createNewTaskEvent } from 'backend/apiUtils/taskEvents';
import { checkTaskUpdatePermissions } from 'backend/apiUtils/tasks';

@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createDistribution(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateDistributionDto,
    @PathParam('id') id: string
  ) {
    await checkTaskUpdatePermissions(req, id);

    const optionalArgs = body.assignees
      ? {
          assignees: {
            connect: body.assignees.map((id) => ({
              id,
            })),
          },
        }
      : {};

    const result = await prisma.releaseTask.create({
      data: {
        ...optionalArgs,
        type: ReleaseTaskType.DISTRIBUTION,
        distributionData: { create: { distributor: { connect: { id: body.distributor } } } },
        release: { connect: { id } },
        status: body.status,
        notes: body.notes,
        dueDate: body.dueDate,
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

    const updatedData = {
      ...pick(body, ['status', 'notes', 'dueDate']),
      assignees: transformAssigneesToPrismaQuery(body.assignees),
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
      data: pickBy(updatedData, (v) => !isNil(v)),
    });
    return result;
  }

  @Delete()
  async deleteDistribution(@Req() req: AuthDecoratedRequest, @PathParam('id') id: string) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
        targetDate: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);

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
