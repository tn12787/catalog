import {
  Body,
  createHandler,
  ValidationPipe,
  Post,
  Request,
  NotFoundException,
  ConflictException,
} from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { CreateInvitationDto } from 'backend/models/invitations/create';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { AuthDecoratedRequest } from 'types/common';
import { sendDynamicEmail } from 'backend/email';

type InvitationEmailData = {
  invitedBy: string;
  teamName: string;
  domain: string;
  inviteId: string;
};

@requiresAuth()
class TeamHandler {
  @Post()
  async createInvite(
    @PathParam('teamId') id: string,
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateInvitationDto
  ) {
    const team = await prisma.team.findUnique({
      where: { id },
      include: { members: { include: { user: { select: { email: true } } } } },
    });
    if (!team) throw new NotFoundException('No team found');

    if (team.members.some((item) => item.user.email === body.email)) {
      throw new ConflictException('User is already a member of this team');
    }

    await checkRequiredPermissions(req, ['UPDATE_TEAM'], id);

    const invite = await prisma.invite.create({
      data: {
        email: body.email,
        role: { connect: { id: body.role } },
        team: {
          connect: {
            id,
          },
        },
      },
    });

    await sendDynamicEmail<InvitationEmailData>({
      to: body.email,
      dynamic_template_data: {
        invitedBy: req.session.token?.name as string,
        teamName: team.name,
        domain: process.env.NEXTAUTH_URL as string,
        inviteId: invite.id,
      },
    });

    return team;
  }
}

export default createHandler(TeamHandler);
