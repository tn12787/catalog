import {
  createHandler,
  Req,
  NotFoundException,
  Patch,
  Body,
  Delete,
} from '@storyofams/next-api-decorators';

import { UpdateContactLabelDto } from 'backend/models/contacts/labels/update';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';

@requiresAuth()
class SpecificNotificationHandler {
  @Patch()
  async updateSingleContact(
    @Req() req: AuthDecoratedRequest,
    @Body() body: UpdateContactLabelDto,
    @PathParam('teamId') teamId: string,
    @PathParam('labelId') labelId: string
  ) {
    if (!labelId) {
      throw new NotFoundException();
    }

    await checkRequiredPermissions(req, ['UPDATE_CONTACTS'], teamId);

    const updatedContactLabel = await prisma.contactLabel.update({
      where: {
        id: labelId,
      },
      data: {
        ...body,
      },
    });
    return updatedContactLabel;
  }

  @Delete()
  async deleteSingleContact(
    @Req() req: AuthDecoratedRequest,
    @PathParam('teamId') teamId: string,
    @PathParam('labelId') labelId: string
  ) {
    if (!labelId) {
      throw new NotFoundException();
    }

    await checkRequiredPermissions(req, ['DELETE_CONTACTS'], teamId);

    const deletedContactLabel = await prisma.contactLabel.delete({
      where: {
        id: labelId,
      },
    });
    return deletedContactLabel;
  }
}

export default createHandler(SpecificNotificationHandler);
