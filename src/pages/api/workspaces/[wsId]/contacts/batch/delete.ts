import {
  createHandler,
  Req,
  Body,
  BadRequestException,
  Post,
  UseMiddleware,
} from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/auth';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { BatchDeleteContactDto } from 'backend/models/contacts/batch/delete';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { requiresPaidPlan } from 'backend/apiUtils/decorators/pricing';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
@requiresPaidPlan({ workspaceParamName: 'wsId' })
class DeleteBatchContactHandler {
  @Post()
  async bulkUpdate(
    @Req() req: AuthDecoratedRequest,
    @PathParam('wsId') workspaceId: string,
    @Body() body: BatchDeleteContactDto
  ) {
    const ids = body.ids;
    if (!body.ids) throw new BadRequestException('No ids provided');

    await checkRequiredPermissions(req, ['DELETE_CONTACTS'], workspaceId);

    const allContacts = await prisma.contact.findMany({
      where: {
        id: { in: ids },
      },
    });

    // silently ignore contacts that don't belong to the workspace
    const contactsToDelete = allContacts.filter((contact) => contact.workspaceId === workspaceId);

    const deleted = await prisma.contact.deleteMany({
      where: { id: { in: contactsToDelete.map((contact) => contact.id) } },
    });

    return deleted;
  }
}

export default createHandler(DeleteBatchContactHandler);
