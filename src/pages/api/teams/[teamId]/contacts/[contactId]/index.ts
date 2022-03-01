import {
  createHandler,
  Req,
  NotFoundException,
  Patch,
  Body,
  Delete,
} from '@storyofams/next-api-decorators';

import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { UpdateContactDto } from 'backend/models/contacts/update';

@requiresAuth()
class SpecificNotificationHandler {
  @Patch()
  async updateSingleContact(
    @Req() req: AuthDecoratedRequest,
    @Body() body: UpdateContactDto,
    @PathParam('teamId') teamId: string,
    @PathParam('contactId') contactId: string
  ) {
    if (!contactId) {
      throw new NotFoundException();
    }

    await checkRequiredPermissions(req, ['UPDATE_CONTACTS'], teamId);

    const updatedContact = await prisma.contact.update({
      where: {
        id: contactId,
      },
      data: {
        ...body,
        labels: { set: body.labels.map(({ id }) => ({ id })) },
      },
    });
    return updatedContact;
  }

  @Delete()
  async deleteSingleContact(
    @Req() req: AuthDecoratedRequest,
    @PathParam('teamId') teamId: string,
    @PathParam('contactId') contactId: string
  ) {
    if (!contactId) {
      throw new NotFoundException();
    }

    await checkRequiredPermissions(req, ['DELETE_CONTACTS'], teamId);

    const deletedContact = await prisma.contact.delete({
      where: {
        id: contactId,
      },
    });
    return deletedContact;
  }
}

export default createHandler(SpecificNotificationHandler);
