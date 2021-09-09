import {
  Body,
  createHandler,
  Delete,
  Get,
  NotFoundException,
  Put,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { ReleaseType } from '@prisma/client';
import { NextApiRequest } from 'next';

import requiresAuth from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { UpdateReleaseDto } from 'backend/models/releases/update';
import { PathParam } from 'backend/apiUtils/decorators/routing';

@requiresAuth()
class ReleaseListHandler {
  @Get()
  async singleRelease(@Req() req: NextApiRequest, @PathParam('id') id: string) {
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
    @Body(ValidationPipe) body: UpdateReleaseDto,
    @PathParam('id') id: string
  ) {
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
  async deleteRelease(@Req() req: NextApiRequest, @PathParam('id') id: string) {
    const result = await prisma.release.delete({
      where: {
        id,
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
