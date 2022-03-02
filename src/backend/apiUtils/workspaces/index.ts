import { uniq } from 'lodash';
import { NotFoundException } from '@storyofams/next-api-decorators';
import { getSession } from 'next-auth/react';

import { stripe } from '../stripe/server';

import { defaultWorkspaceLabels } from './defaultLabels';

import prisma from 'backend/prisma/client';
import { PermissionType, ExtendedSession, AuthDecoratedRequest } from 'types/common';
import { ForbiddenException } from 'backend/apiUtils/exceptions';

type UserCreateArgs = {
  name: string;
  userId: string;
  email: string;
};

export const createDefaultWorkspaceForUser = async ({ name, userId, email }: UserCreateArgs) => {
  const nameString = `${name}'s Workspace`;

  try {
    const customer = await stripe.customers.create({ name: nameString, email });

    await prisma.workspace.create({
      data: {
        name: nameString,
        provider: 'GSUITE',
        members: {
          create: {
            user: { connect: { id: userId } },
            roles: { connect: { name: 'Admin' } },
          },
        },
        contactLabels: { create: defaultWorkspaceLabels },
        stripeCustomerId: customer.id,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const manageSubscriptionChange = async (customer: string, id?: string) => {
  await prisma.workspace.update({
    where: { stripeCustomerId: customer },
    data: { stripeSubscriptionId: id ?? null },
  });
};

export const getResourceWorkspaceMembership = async (
  req: AuthDecoratedRequest,
  workspaceId?: string
) => {
  const session = (await getSession({ req })) as ExtendedSession;

  return session?.token.workspaceMemberships.find(
    (userWorkspace) => userWorkspace.workspaceId === workspaceId
  );
};

export const ensureUserHasWorkspaceMembershipSync = (
  session: ExtendedSession,
  workspaceMemberId?: string
) => {
  const workspaceMembership = session?.token.workspaceMemberships.find(
    (userWorkspace) => userWorkspace.id === workspaceMemberId
  );

  if (!workspaceMembership || !workspaceMemberId) {
    throw new NotFoundException();
  }

  return workspaceMembership;
};

export const ensureUserHasWorkspaceMembership = async (
  req: AuthDecoratedRequest,
  workspaceMemberId?: string
) => {
  const session = (await getSession({ req })) as ExtendedSession;

  return ensureUserHasWorkspaceMembershipSync(session, workspaceMemberId);
};

export const getAllUserPermissionsForWorkspace = async (
  req: AuthDecoratedRequest,
  resourceWorkspace?: string
) => {
  const workspaceMembership = await getResourceWorkspaceMembership(req, resourceWorkspace);
  if (!workspaceMembership || !resourceWorkspace) {
    throw new NotFoundException();
  }

  const permissionsForWorkspace = uniq(
    workspaceMembership.roles
      .map((item) => item.permissions.map((permission) => permission.name))
      .flat(2)
  );

  return permissionsForWorkspace;
};

export const checkRequiredPermissions = async (
  req: AuthDecoratedRequest,
  permissions: PermissionType[],
  resourceWorkspace?: string
) => {
  const permissonsForWorkspace = await getAllUserPermissionsForWorkspace(req, resourceWorkspace);

  if (
    !permissonsForWorkspace.some((permission) => permissions.includes(permission as PermissionType))
  ) {
    throw new ForbiddenException();
  }
};
