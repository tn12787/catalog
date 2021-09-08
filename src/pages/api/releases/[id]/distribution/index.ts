import {
  Body,
  createHandler,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { CreateReleaseDto } from 'backend/models/releases/create';

import { Release, ReleaseType } from '@prisma/client';
import requiresAuth from 'backend/apiUtils/auth';
import prisma from 'backend/prisma/client';
import { UpdateReleaseDto } from 'backend/models/releases/update';
import { SortOrder } from 'queries/types';
import { CreateDistributionDto } from 'backend/models/distribution/create';
import { CreateArtworkDto } from 'backend/models/artwork/create';
import { pickBy } from 'lodash';
import { NextApiRequest } from 'next';

@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createDistribution(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: CreateDistributionDto
  ) {
    const { id } = req.query as { id: string };
    const optionalArgs = body.assignee
      ? { assignee: { connect: { id: body.assignee } } }
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
    @Body(ValidationPipe) body: CreateDistributionDto
  ) {
    const { id } = req.query as { id: string };
    const optionalArgs = body.assignee
      ? { assignee: { connect: { id: body.assignee } } }
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
  async deleteDistribution(@Req() req: NextApiRequest) {
    const { id } = req.query as { id: string };
    const result = await prisma.distribution.delete({
      where: {
        releaseId: id,
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
