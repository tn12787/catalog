import { uniq } from 'lodash';
import { NotFoundException } from '@storyofams/next-api-decorators';
import { getSession } from 'next-auth/react';

import { stripe } from './../stripe/server';

import prisma from 'backend/prisma/client';
import { PermissionType, ExtendedSession, AuthDecoratedRequest } from 'types/common';
import { ForbiddenException } from 'backend/apiUtils/exceptions';

type UserCreateArgs = {
  name: string;
  userId: string;
  email: string;
};

export const createDefaultTeamForUser = async ({ name, userId, email }: UserCreateArgs) => {
  const nameString = `${name}'s Team`;

  const customer = await stripe.customers.create({ name: nameString, email });

  await prisma.team.create({
    data: {
      name: nameString,
      provider: 'GSUITE',
      members: {
        create: {
          user: { connect: { id: userId } },
          roles: { connect: { name: 'Admin' } },
        },
      },
      stripeCustomerId: customer.id,
    },
  });
};

export const getResourceTeamMembership = async (req: AuthDecoratedRequest, teamId?: string) => {
  const session = (await getSession({ req })) as ExtendedSession;

  return session?.token.teams.find((userTeam) => userTeam.teamId === teamId);
};

export const ensureUserHasTeamMembershipSync = (
  session: ExtendedSession,
  teamMemberId?: string
) => {
  const teamMembership = session?.token.teams.find((userTeam) => userTeam.id === teamMemberId);

  if (!teamMembership || !teamMemberId) {
    throw new NotFoundException();
  }

  return teamMembership;
};

export const ensureUserHasTeamMembership = async (
  req: AuthDecoratedRequest,
  teamMemberId?: string
) => {
  const session = (await getSession({ req })) as ExtendedSession;

  return ensureUserHasTeamMembershipSync(session, teamMemberId);
};

export const getAllUserPermissionsForTeam = async (
  req: AuthDecoratedRequest,
  resourceTeam?: string
) => {
  const teamMembership = await getResourceTeamMembership(req, resourceTeam);
  if (!teamMembership || !resourceTeam) {
    throw new NotFoundException();
  }

  const permissionsForTeam = uniq(
    teamMembership.roles
      .map((item) => item.permissions.map((permission) => permission.name))
      .flat(2)
  );

  return permissionsForTeam;
};

export const checkRequiredPermissions = async (
  req: AuthDecoratedRequest,
  permissions: PermissionType[],
  resourceTeam?: string
) => {
  const permissionsForTeam = await getAllUserPermissionsForTeam(req, resourceTeam);

  if (
    !permissionsForTeam.some((permission) => permissions.includes(permission as PermissionType))
  ) {
    throw new ForbiddenException();
  }
};
