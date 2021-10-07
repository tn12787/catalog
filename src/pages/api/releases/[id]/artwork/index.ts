import {
  Body,
  createHandler,
  Delete,
  Patch,
  Post,
  Put,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { pickBy, isNil, pick } from 'lodash';
import { NextApiRequest } from 'next';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { CreateArtworkDto } from 'backend/models/artwork/create';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { UpdateArtworkDto } from 'backend/models/artwork/update';
import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';

@requiresAuth()
class ReleaseListHandler {
  @Post()
  async createArtwork(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: CreateArtworkDto,
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

    const optionalArgs = pickBy(
      {
        assignees: body.assignees
          ? {
              connect: body.assignees.map((id) => ({
                id,
              })),
            }
          : undefined,
        url: body.url,
        dueDate: body.dueDate,
      },
      (v) => v !== undefined
    );

    const result = await prisma.artwork.create({
      data: {
        ...optionalArgs,
        release: { connect: { id } },
        status: body.status,
        notes: body.notes,
      },
    });
    return result;
  }

  @Patch()
  async updateArtwork(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: UpdateArtworkDto,
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

    const updateArgs = {
      ...pick(body, ['status', 'notes', 'dueDate', 'url']),
      assignees: transformAssigneesToPrismaQuery(body.assignees),
    };

    const result = await prisma.artwork.update({
      where: {
        releaseId: id,
      },
      data: pickBy(updateArgs, (v) => !isNil(v)),
    });
    return result;
  }

  @Delete()
  async deleteArtwork(@Req() req: NextApiRequest, @PathParam('id') id: string) {
    const releaseTeam = await prisma.release.findUnique({
      where: { id },
      select: {
        teamId: true,
      },
    });

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], releaseTeam?.teamId);

    const result = await prisma.artwork.delete({
      where: {
        releaseId: id,
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
