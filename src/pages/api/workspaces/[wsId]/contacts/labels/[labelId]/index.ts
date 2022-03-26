import { createHandler, Req, Patch, Body, Delete } from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/auth';
import { UpdateContactLabelDto } from 'backend/models/contacts/labels/update';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { requiresPaidPlan } from 'backend/apiUtils/decorators/pricing';

@requiresAuth()
@requiresPaidPlan({ workspaceParamName: 'wsId' })
class SpecificContactLabelHandler {
  @Patch()
  async updateSingleContact(
    @Req() req: AuthDecoratedRequest,
    @Body() body: UpdateContactLabelDto,
    @PathParam('wsId') workspaceId: string,
    @PathParam('labelId') labelId: string
  ) {
    await checkRequiredPermissions(req, ['UPDATE_CONTACTS'], workspaceId);

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
    @PathParam('wsId') workspaceId: string,
    @PathParam('labelId') labelId: string
  ) {
    await checkRequiredPermissions(req, ['DELETE_CONTACTS'], workspaceId);

    const deletedContactLabel = await prisma.contactLabel.delete({
      where: {
        id: labelId,
      },
    });
    return deletedContactLabel;
  }
}

export default createHandler(SpecificContactLabelHandler);
