import {
  Body,
  createHandler,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  ValidationPipe,
} from 'next-api-decorators';

import type { AuthDecoratedRequest } from 'types/auth';
import { CreateContactLabelDto } from 'backend/models/contacts/labels/create';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { requiresPaidPlan } from 'backend/apiUtils/decorators/pricing';

@requiresAuth()
@requiresPaidPlan({ workspaceParamName: 'wsId' })
class ContactLabelHandler {
  @Get()
  async list(
    @Req() req: AuthDecoratedRequest,
    @PathParam('wsId') workspaceId: string,
    @Query('search') search: string
  ) {
    await checkRequiredPermissions(req, ['VIEW_CONTACTS'], workspaceId);

    const commonArgs = {
      where: {
        name: { contains: search, mode: 'insensitive' } as any,
        workspace: { id: workspaceId },
      },
    };

    const labels = await prisma.contactLabel.findMany({
      ...commonArgs,
      include: {
        contacts: { select: { id: true, name: true } },
      },
      orderBy: {
        name: 'asc',
      },
    });
    return labels;
  }

  @Post()
  @HttpCode(201)
  async createContactLabel(
    @Body(ValidationPipe) body: CreateContactLabelDto,
    @PathParam('wsId') workspaceId: string,
    @Req() req: AuthDecoratedRequest
  ) {
    await checkRequiredPermissions(req, ['CREATE_CONTACTS'], workspaceId);

    const result = await prisma.contactLabel.create({
      data: {
        name: body.name,
        color: body.color,
        workspace: { connect: { id: workspaceId } },
      },
    });

    return result;
  }
}

export default createHandler(ContactLabelHandler);
