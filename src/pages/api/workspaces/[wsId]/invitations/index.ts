import {
  Body,
  createHandler,
  ValidationPipe,
  Post,
  Request,
  ConflictException,
} from 'next-api-decorators';

import { ForbiddenException } from './../../../../../backend/apiUtils/exceptions';

import { isBackendFeatureEnabled } from 'common/features';
import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
import type { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { CreateInvitationDto } from 'backend/models/invitations/create';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { sendDynamicEmail } from 'backend/apiUtils/email';
import { requiresPaidPlan } from 'backend/apiUtils/decorators/pricing';
import { FeatureKey } from 'common/features/types';

const inviteUserTemplateId = `d-324235f107c041f58e03d8fd8a66e104`;

type InvitationEmailData = {
  invitedBy: string;
  workspaceName: string;
  domain: string;
  inviteId: string;
};

@requiresAuth()
@requiresPaidPlan({ workspaceParamName: 'wsId', plan: 'Label Plan' })
class InviteHandler {
  @Post()
  async createInvite(
    @PathParam('wsId') id: string,
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateInvitationDto
  ) {
    const workspace = await getWorkspaceByIdIsomorphic(req, id);

    if (workspace.members.some((item) => item.user.email === body.email)) {
      throw new ConflictException('User is already a member of this workspace');
    }

    if (
      workspace.members.length >= (workspace.subscription?.totalSeats ?? 1) &&
      isBackendFeatureEnabled(FeatureKey.PAYMENTS)
    ) {
      throw new ForbiddenException('No more license seats left in plan.');
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
