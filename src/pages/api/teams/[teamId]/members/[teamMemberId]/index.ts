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

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import {
  checkRequiredPermissions,
  getResourceWorkspaceMembership,
} from 'backend/apiUtils/workspaces';
import { AuthDecoratedRequest } from 'types/common';
import { UpdateTeamMemberDto } from 'backend/models/teams/members/update';

@requiresAuth()
class TeamHandler {
  @Patch()
  async updateTeam(
    @Request() req: AuthDecoratedRequest,
    @PathParam('workspaceId') workspaceId: string,
    @PathParam('workspaceMemberId') workspaceMemberId: string,
    @Body(ValidationPipe) body: UpdateTeamMemberDto
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], workspaceId);
    const teamMember = await prisma.workspaceMember.update({
      where: { id: workspaceMemberId },
      data: {
        roles: { set: body.roles.map((id) => ({ id })) },
      },
    });

    return teamMember;
  }

  @Delete()
  async removeTeamMember(
    @Request() req: AuthDecoratedRequest,
    @PathParam('workspaceId') workspaceId: string,
    @PathParam('workspaceMemberId') workspaceMemberId: string
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], workspaceId);

    const instigator = await getResourceWorkspaceMembership(req, workspaceId);
    if (!instigator) throw new NotFoundException('You are not a member of this team');

    if (instigator.id === workspaceMemberId)
      throw new BadRequestException('You cannot remove yourself from a team');

    const team = await prisma.workspaceMember.delete({
      where: { id: workspaceMemberId },
    });

    return team;
  }
}

export default createHandler(TeamHandler);
