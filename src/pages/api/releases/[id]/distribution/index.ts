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
import { NextApiRequest } from 'next';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { CreateDistributionDto } from 'backend/models/distribution/create';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { UpdateDistributionDto } from 'backend/models/distribution/update';
import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';

@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createDistribution(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: CreateDistributionDto,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
        targetDate: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);

    const optionalArgs = body.assignees
      ? {
          assignees: {
            connect: body.assignees.map((id) => ({
              id,
            })),
          },
        }
      : {};

    const result = await prisma.distribution.create({
      data: {
        ...optionalArgs,
        distributor: { connect: { id: body.distributor } },
        release: { connect: { id } },
        status: body.status,
        notes: body.notes,
        dueDate: body.dueDate,
      },
    });
    return result;
  }

  @Patch()
  async updateDistribution(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: UpdateDistributionDto,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
        targetDate: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);

    const updatedData = {
      ...pick(body, ['status', 'notes', 'dueDate']),
      assignees: transformAssigneesToPrismaQuery(body.assignees),
      distributor: body.distributor ? { connect: { id: body.distributor } } : undefined,
    };

    const result = await prisma.distribution.update({
      where: {
        releaseId: id,
      },
      data: pickBy(updatedData, (v) => !isNil(v)),
    });
    return result;
  }

  @Delete()
  async deleteDistribution(@Req() req: NextApiRequest, @PathParam('id') id: string) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
        targetDate: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);

    const result = await prisma.distribution.delete({
      where: {
        releaseId: id,
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
