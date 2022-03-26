import {
  Body,
  createHandler,
  DefaultValuePipe,
  Get,
  HttpCode,
  ParseNumberPipe,
  Post,
  Query,
  Req,
  UseMiddleware,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { Contact } from '@prisma/client';

import { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { SortOrder } from 'queries/types';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { CreateContactDto } from 'backend/models/contacts/create';
import { requiresPaidPlan } from 'backend/apiUtils/decorators/pricing';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
@requiresPaidPlan({ workspaceParamName: 'wsId' })
class ContactHandler {
  @Get()
  async list(
    @Req() req: AuthDecoratedRequest,
    @PathParam('wsId') workspaceId: string,
    @Query('search') search: string,
    @Query('sortBy', DefaultValuePipe<keyof Contact>('name')) sortBy: keyof Contact,
    @Query('sortOrder', DefaultValuePipe(SortOrder.ASC)) sortOrder: SortOrder,
    @Query('pageSize', DefaultValuePipe(10), ParseNumberPipe) pageSize: number,
    @Query('page', DefaultValuePipe(1), ParseNumberPipe) page: number
  ) {
    await checkRequiredPermissions(req, ['VIEW_CONTACTS'], workspaceId);

    const commonArgs = {
      where: {
        name: { contains: search, mode: 'insensitive' } as any,
        workspace: { id: workspaceId },
      },
    };

    const [contacts, totalCount] = await prisma.$transaction([
      prisma.contact.findMany({
        ...commonArgs,
        skip: pageSize * (page - 1),
        take: pageSize,
        include: {
          labels: true,
          tasks: {
            include: {
              assignees: { include: { user: true } },
              artworkData: true,
              distributionData: { include: { distributor: true } },
              masteringData: true,
            },
          },
        },
        orderBy: sortBy
          ? {
              [sortBy]: sortOrder,
            }
          : undefined,
      }),
      prisma.contact.count(commonArgs),
    ]);

    return {
      total: totalCount,
      results: contacts,
    };
  }

  @Post()
  @HttpCode(201)
  async createContact(
    @Body(ValidationPipe) body: CreateContactDto,
    @PathParam('wsId') workspaceId: string,
    @Req() req: AuthDecoratedRequest
  ) {
    await checkRequiredPermissions(req, ['CREATE_CONTACTS'], workspaceId);

    const result = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        labels: {
          connectOrCreate: body.labels?.map(({ name, color }) => ({
            where: { name_workspaceId: { name, workspaceId } },
            create: { name, workspaceId, color },
          })),
        },
        workspace: { connect: { id: workspaceId } },
      },
    });

    return result;
  }
}

export default createHandler(ContactHandler);
