import {
  Body,
  createHandler,
  Delete,
  Post,
  Put,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { NextApiRequest } from 'next';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { CreateDistributionDto } from 'backend/models/distribution/create';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';

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

    await checkRequiredPermissions(
      req,
      ['UPDATE_RELEASES'],
      releaseTeam?.teamId
    );

    const optionalArgs = body.assignees
      ? {
          assignees: {
            set: body.assignees.map((id) => ({
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

  @Put()
  async updateDistribution(
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

    await checkRequiredPermissions(
      req,
      ['UPDATE_RELEASES'],
      releaseTeam?.teamId
    );

    const optionalArgs = body.assignees
      ? {
          assignees: {
            set: body.assignees.map((id) => ({
              id,
            })),
          },
        }
      : {};
    const result = await prisma.distribution.update({
      where: {
        releaseId: id,
      },
      data: {
        ...optionalArgs,
        distributor: { connect: { id: body.distributor } },
        status: body.status,
        notes: body.notes,
        dueDate: body.dueDate,
      },
    });
    return result;
  }

  @Delete()
  async deleteDistribution(
    @Req() req: NextApiRequest,
    @PathParam('id') id: string
  ) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
        targetDate: true,
      },
    });

    await checkRequiredPermissions(
      req,
      ['UPDATE_RELEASES'],
      releaseTeam?.teamId
    );

    const result = await prisma.distribution.delete({
      where: {
        releaseId: id,
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
