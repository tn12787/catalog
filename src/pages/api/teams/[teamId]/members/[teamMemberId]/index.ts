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
import { UpdateTeamDto } from 'backend/models/teams/update';
import { checkRequiredPermissions, getResourceTeamMembership } from 'backend/apiUtils/teams';
import { AuthDecoratedRequest } from 'types/common';

@requiresAuth()
class TeamHandler {
  @Patch()
  async updateTeam(
    @PathParam('teamId') id: string,
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateTeamDto
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], id);
    const team = await prisma.team.update({
      where: { id },
      data: {
        name: body.name,
      },
    });

    return team;
  }

  @Delete()
  async removeTeamMember(
    @PathParam('teamId') teamId: string,
    @Request() req: AuthDecoratedRequest,
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
