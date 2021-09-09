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
import { Release, ReleaseType } from '@prisma/client';
import { pickBy } from 'lodash';
import { NextApiRequest } from 'next';

import { CreateReleaseDto } from 'backend/models/releases/create';
import requiresAuth from 'backend/apiUtils/auth';
import prisma from 'backend/prisma/client';
import { UpdateReleaseDto } from 'backend/models/releases/update';
import { SortOrder } from 'queries/types';
import { CreateDistributionDto } from 'backend/models/distribution/create';
import { CreateArtworkDto } from 'backend/models/artwork/create';


@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createArtwork(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: CreateArtworkDto
  ) {
    const { id } = req.query as { id: string };
    const optionalArgs = pickBy(
      {
        assignee: body.assignee
          ? { connect: { id: body.assignee } }
          : undefined,
        url: body.url,
      },
      (v) => v !== undefined
    );
    const result = await prisma.artwork.create({
      data: {
        ...optionalArgs,
        release: { connect: { id } },
        status: body.status,
        notes: body.notes,
        dueDate: body.dueDate,
      },
    });
    return result;
  }

  @Put()
  async updateArtwork(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: CreateArtworkDto
  ) {
    const { id } = req.query as { id: string };
    const optionalArgs = pickBy(
      {
        assignee: body.assignee
          ? { connect: { id: body.assignee } }
          : undefined,
        url: body.url,
      },
      (v) => v !== undefined
    );

    const result = await prisma.artwork.update({
      where: {
        releaseId: id,
      },
      data: {
        ...optionalArgs,
        status: body.status,
        notes: body.notes,
        dueDate: body.dueDate,
      },
    });
    return result;
  }

  @Delete()
  async deleteArtwork(@Req() req: NextApiRequest) {
    const { id } = req.query as { id: string };
    const result = await prisma.artwork.delete({
      where: {
        releaseId: id,
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
