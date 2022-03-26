import {
  BadRequestException,
  Body,
  createHandler,
  Delete,
  NotFoundException,
  Patch,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/auth';
import { UpdateWorkspaceMemberDto } from 'backend/models/workspaces/members/update';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import {
  checkRequiredPermissions,
  getResourceWorkspaceMembership,
} from 'backend/apiUtils/workspaces';
import { requiresPaidPlan } from 'backend/apiUtils/decorators/pricing';

@requiresAuth()
@requiresPaidPlan({ workspaceParamName: 'wsId', plan: 'Label Plan' })
class WorkspaceMemberHandler {
  @Patch()
  async updateWorkspace(
    @Request() req: AuthDecoratedRequest,
    @PathParam('wsId') workspaceId: string,
    @PathParam('workspaceMemberId') workspaceMemberId: string,
    @Body(ValidationPipe) body: UpdateWorkspaceMemberDto
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], workspaceId);
    const workspaceMember = await prisma.workspaceMember.update({
      where: { id: workspaceMemberId },
      data: {
        roles: { set: body.roles.map((id) => ({ id })) },
      },
    });

    return workspaceMember;
  }

  @Delete()
  async removeWorkspaceMember(
    @Request() req: AuthDecoratedRequest,
    @PathParam('wsId') workspaceId: string,
    @PathParam('workspaceMemberId') workspaceMemberId: string
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], workspaceId);

    const instigator = await getResourceWorkspaceMembership(req, workspaceId);
    if (!instigator) throw new NotFoundException('You are not a member of this workspace');

    if (instigator.id === workspaceMemberId)
      throw new BadRequestException('You cannot remove yourself from a workspace');

    const workspace = await prisma.workspaceMember.delete({
      where: { id: workspaceMemberId },
    });

    return workspace;
  }
}

export default createHandler(WorkspaceMemberHandler);
