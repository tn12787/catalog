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
import { pick, pickBy, isNil } from 'lodash';
import { ReleaseTaskType } from '@prisma/client';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { CreateMasteringDto } from 'backend/models/mastering/create';
import { UpdateMasteringDto } from 'backend/models/mastering/update';
import { transformAssigneesToPrismaQuery } from 'backend/apiUtils/transforms/assignees';

@requiresAuth()
class MasteringHandler {
  @Post()
  async createMastering(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: CreateMasteringDto,
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
        dueDate: body.dueDate,
      },
      (v) => v !== undefined
    );

    const result = await prisma.releaseTask.create({
      data: {
        ...optionalArgs,
        type: ReleaseTaskType.MASTERING,
        masteringData: { create: { url: body.url } },
        release: { connect: { id } },
        status: body.status,
        notes: body.notes,
      },
    });
    return result;
  }

  @Put()
  async updateMastering(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe) body: UpdateMasteringDto,
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
  async deleteMastering(@Req() req: NextApiRequest, @PathParam('id') id: string) {
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
