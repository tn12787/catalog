import {
  createHandler,
  Req,
  NotFoundException,
  Patch,
  Body,
  Delete,
  ForbiddenException,
} from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/auth';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { UpdateContactDto } from 'backend/models/contacts/update';
import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
import { hasPaidPlan } from 'utils/billing';

@requiresAuth()
class SpecificNotificationHandler {
  @Patch()
  async updateSingleContact(
    @Req() req: AuthDecoratedRequest,
    @Body() body: UpdateContactDto,
    @PathParam('wsId') workspaceId: string,
    @PathParam('contactId') contactId: string
  ) {
    if (!contactId) {
      throw new NotFoundException();
    }

    const workspace = await getWorkspaceByIdIsomorphic(req, workspaceId);
    if (!hasPaidPlan(workspace)) {
      throw new ForbiddenException('A paid plan is required to use this feature.');
    }

    await checkRequiredPermissions(req, ['UPDATE_CONTACTS'], workspaceId);

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
    @PathParam('wsId') workspaceId: string,
    @PathParam('contactId') contactId: string
  ) {
    if (!contactId) {
      throw new NotFoundException();
    }

    const workspace = await getWorkspaceByIdIsomorphic(req, workspaceId);
    if (!hasPaidPlan(workspace)) {
      throw new ForbiddenException('A paid plan is required to use this feature.');
    }

    await checkRequiredPermissions(req, ['DELETE_CONTACTS'], workspaceId);

    const deletedContact = await prisma.contact.delete({
      where: {
        id: contactId,
      },
    });
    return deletedContact;
  }
}

export default createHandler(SpecificNotificationHandler);
