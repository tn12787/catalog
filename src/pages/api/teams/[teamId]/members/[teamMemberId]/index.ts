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
import { checkRequiredPermissions, getResourceTeamMembership } from 'backend/apiUtils/teams';
import { AuthDecoratedRequest } from 'types/common';
import { UpdateTeamMemberDto } from 'backend/models/teams/members/update';

@requiresAuth()
class TeamHandler {
  @Patch()
  async updateTeam(
    @Request() req: AuthDecoratedRequest,
    @PathParam('teamId') teamId: string,
    @PathParam('teamMemberId') teamMemberId: string,
    @Body(ValidationPipe) body: UpdateTeamMemberDto
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], teamId);
    const teamMember = await prisma.teamMember.update({
      where: { id: teamMemberId },
      data: {
        roles: { set: body.roles.map((id) => ({ id })) },
      },
    });

    return teamMember;
  }

  @Delete()
  async removeTeamMember(
    @Request() req: AuthDecoratedRequest,
    @PathParam('teamId') teamId: string,
    @PathParam('teamMemberId') teamMemberId: string
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], teamId);

    const instigator = await getResourceTeamMembership(req, teamId);
    if (!instigator) throw new NotFoundException('You are not a member of this team');

    if (instigator.id === teamMemberId)
      throw new BadRequestException('You cannot remove yourself from a team');

    const team = await prisma.teamMember.delete({
      where: { id: teamMemberId },
    });

    return team;
  }
}

export default createHandler(TeamHandler);
