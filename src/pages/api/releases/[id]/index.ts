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
  @Get()
  async singleRelease(@Req() req: NextApiRequest) {
    const { id } = req.query as { id: string };
    if (!id) throw new NotFoundException();

    const release = await prisma.release.findUnique({
      where: {
        id,
      },
      include: {
        artist: true,
        artwork: true,
        distribution: { include: { distributor: true } },
        marketing: true,
        musicVideo: true,
      },
    });

    return release;
  }

  @Put()
  async updateRelease(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: UpdateReleaseDto
  ) {
    const { id } = req.query as { id: string };
    if (!id) throw new NotFoundException();

    const result = await prisma.release.update({
      where: {
        id,
      },
      data: {
        artist: { connect: { id: body.artist } },
        name: body.name,
        type: body.type as ReleaseType,
        targetDate: body.targetDate,
      },
    });
    return result;
  }

  @Delete()
  async deleteRelease(@Req() req: NextApiRequest) {
    const { id } = req.query as { id: string };
    const result = await prisma.release.delete({
      where: {
        id,
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
