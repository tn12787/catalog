import { uniq } from 'lodash';
import { NotFoundException } from '@storyofams/next-api-decorators';
import { getSession } from 'next-auth/react';
import Stripe from 'stripe';

import { getOrCreateStripeCustomer } from '../stripe/customers';

import { defaultWorkspaceLabels } from './defaultLabels';

import { transformSubscriptionToBasicData } from 'backend/apiUtils/transforms/subscriptions';
import { AuthDecoratedRequest, ExtendedSession } from 'types/auth';
import prisma from 'backend/prisma/client';
import { ForbiddenException } from 'backend/apiUtils/exceptions';
import { PermissionType } from 'types/permissions';

type UserCreateArgs = {
  name: string;
  userId: string;
  email: string;
};

export const createDefaultWorkspaceForUser = async ({ name, userId, email }: UserCreateArgs) => {
  const nameString = name ? `${name}'s Workspace` : `My Workspace`;

  try {
    const stripeCustomerId = await getOrCreateStripeCustomer(name, email);

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
        stripeCustomerId,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const manageSubscriptionChange = async (subscription: Stripe.Subscription) => {
  const customerWorkspace = await prisma.workspace.findUnique({
    where: { stripeCustomerId: subscription.customer as string },
  });

  if (!customerWorkspace) {
    return;
  }

  const mappedData = await transformSubscriptionToBasicData(subscription);

  await prisma.subscription.upsert({
    where: { id: subscription.id },
    create: {
      id: subscription.id,
      workspace: { connect: { id: customerWorkspace.id } },
      ...mappedData,
    },
    update: mappedData,
  });
};

export const manageSubscriptionDelete = async (subscription: Stripe.Subscription) => {
  await prisma.subscription.delete({
    where: { id: subscription.id },
  });
};

export const manageCustomerDelete = async (customer: string) => {
  try {
    await prisma.workspace.update({
      where: { stripeCustomerId: customer },
      data: { stripeCustomerId: null },
    });
  } catch (e) {
    console.error(e);
  }
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
