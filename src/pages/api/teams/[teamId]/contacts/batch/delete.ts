import {
  createHandler,
  Req,
  Body,
  BadRequestException,
  Post,
} from '@storyofams/next-api-decorators';

import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { BatchDeleteContactDto } from 'backend/models/contacts/batch/delete';
import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';

@requiresAuth()
class DeleteBatchContactHandler {
  @Post()
  async bulkUpdate(
    @Req() req: AuthDecoratedRequest,
    @PathParam('teamId') teamId: string,
    @Body() body: BatchDeleteContactDto
  ) {
    const ids = body.ids;
    if (!body.ids) throw new BadRequestException('No ids provided');

    await checkRequiredPermissions(req, ['DELETE_CONTACTS'], teamId);

    const allContacts = await prisma.contact.findMany({
      where: {
        id: { in: ids },
      },
    });

    // silently ignore contacts that don't belong to the team
    const contactsToDelete = allContacts.filter((contact) => contact.teamId === teamId);

    const deleted = await prisma.contact.deleteMany({
      where: { id: { in: contactsToDelete.map((contact) => contact.id) } },
    });

    return deleted;
  }
}

export default createHandler(DeleteBatchContactHandler);
