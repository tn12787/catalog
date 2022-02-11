import {
  createHandler,
  Req,
  Body,
  BadRequestException,
  Post,
} from '@storyofams/next-api-decorators';

import { checkRequiredPermissions } from 'backend/apiUtils/teams/index';
import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { BatchCreateContactDto } from 'backend/models/contacts/batch/create';

@requiresAuth()
class CreateBatchContactHandler {
  @Post()
  async bulkUpdate(
    @Req() req: AuthDecoratedRequest,
    @PathParam('teamId') teamId: string,
    @Body() body: BatchCreateContactDto
  ) {
    if (!body.data) throw new BadRequestException('No data provided');

    await checkRequiredPermissions(req, ['CREATE_CONTACTS'], teamId);

    const newContacts = await prisma.contact.createMany({
      skipDuplicates: true,
      data: body.data.map((x) => ({
        ...x,
        teamId,
        labels: {
          connectOrCreate: x.labels?.map(({ name, color }) => ({
            where: { name_teamId: { name, teamId } },
            create: { name, teamId, color },
          })),
        },
      })),
    });

    return newContacts;
  }
}

export default createHandler(CreateBatchContactHandler);
