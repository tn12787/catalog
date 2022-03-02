import {
  Body,
  createHandler,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { CreateContactLabelDto } from 'backend/models/contacts/labels/create';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { AuthDecoratedRequest } from 'types/common';
import { PathParam } from 'backend/apiUtils/decorators/routing';

@requiresAuth()
class ContactLabelHandler {
  @Get()
  async list(
    @Req() req: AuthDecoratedRequest,
    @PathParam('workspaceId') workspace: string,
    @Query('search') search: string
  ) {
    await checkRequiredPermissions(req, ['VIEW_CONTACTS'], team);

    const commonArgs = {
      where: {
        name: { contains: search, mode: 'insensitive' } as any,
        workspace: { id: team },
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
    @PathParam('workspaceId') workspaceId: string,
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
