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
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { AuthDecoratedRequest } from 'types/common';
import { sendDynamicEmail } from 'backend/email';

const inviteUserTemplateId = `d-324235f107c041f58e03d8fd8a66e104`;

type InvitationEmailData = {
  invitedBy: string;
  workspaceName: string;
  domain: string;
  inviteId: string;
};

@requiresAuth()
class InviteHandler {
  @Post()
  async createInvite(
    @PathParam('workspaceId') id: string,
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateInvitationDto
  ) {
    const workspace = await prisma.workspace.findUnique({
      where: { id },
      include: { members: { include: { user: { select: { email: true } } } } },
    });
    if (!workspace) throw new NotFoundException('No workspace found');

    if (workspace.members.some((item) => item.user.email === body.email)) {
      throw new ConflictException('User is already a member of this workspace');
    }

    await checkRequiredPermissions(req, ['UPDATE_TEAM'], id);

    const invite = await prisma.invite.create({
      data: {
        email: body.email,
        role: { connect: { id: body.role } },
        workspace: {
          connect: {
            id,
          },
        },
      },
    });

    await sendDynamicEmail<InvitationEmailData>({
      to: body.email,
      templateId: inviteUserTemplateId,
      dynamicTemplateData: {
        invitedBy: req.session.token?.name as string,
        workspaceName: workspace.name,
        domain: process.env.NEXTAUTH_URL as string,
        inviteId: invite.id,
      },
    });

    return workspace;
  }
}

export default createHandler(InviteHandler);
