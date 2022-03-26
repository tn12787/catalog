import {
  createHandler,
  Req,
  Body,
  BadRequestException,
  Post,
  ForbiddenException,
} from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/auth';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { BatchCreateContactDto } from 'backend/models/contacts/batch/create';
import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
import { hasPaidPlan } from 'utils/billing';

@requiresAuth()
class CreateBatchContactHandler {
  @Post()
  async bulkUpdate(
    @Req() req: AuthDecoratedRequest,
    @PathParam('wsId') workspaceId: string,
    @Body() body: BatchCreateContactDto
  ) {
    const workspace = await getWorkspaceByIdIsomorphic(req, workspaceId);
    if (!hasPaidPlan(workspace)) {
      throw new ForbiddenException('A paid plan is required to use this feature.');
    }

    if (!body.data) throw new BadRequestException('No data provided');

    await checkRequiredPermissions(req, ['CREATE_CONTACTS'], workspaceId);

    const newContacts = await prisma.contact.createMany({
      skipDuplicates: true,
      data: body.data.map((x) => ({
        ...x,
        workspaceId,
        labels: {
          connectOrCreate: x.labels?.map(({ name, color }) => ({
            where: { name_workspaceId: { name, workspaceId } },
            create: { name, workspaceId, color },
          })),
        },
      })),
    });

    return newContacts;
  }
}

export default createHandler(CreateBatchContactHandler);
