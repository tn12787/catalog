import {
  Body,
  createHandler,
  Delete,
  Get,
  Put,
  Req,
  Request,
  UseMiddleware,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
import { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateWorkspaceDto } from 'backend/models/workspaces/update';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
class WorkspaceHandler {
  @Get()
  async retrieveWorkspace(@Req() req: AuthDecoratedRequest, @PathParam('wsId') id: string) {
    return getWorkspaceByIdIsomorphic(req, id);
  }

  @Put()
  async updateWorkspace(
    @PathParam('wsId') id: string,
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateWorkspaceDto
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], id);
    const workspace = await prisma.workspace.update({
      where: { id },
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
      },
    });

    return workspace;
  }

  @Delete()
  async deleteWorkspace(@PathParam('wsId') id: string, @Request() req: AuthDecoratedRequest) {
    await checkRequiredPermissions(req, ['DELETE_TEAM'], id);
    const workspace = await prisma.workspace.delete({
      where: { id },
    });

    return workspace;
  }
}

export default createHandler(WorkspaceHandler);
