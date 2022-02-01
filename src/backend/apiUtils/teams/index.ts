import { uniq } from 'lodash';
import { NotFoundException, BadRequestException } from '@storyofams/next-api-decorators';
import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

import prisma from 'backend/prisma/client';
import { PermissionType, ExtendedSession, AuthDecoratedRequest } from 'types/common';
import { ForbiddenException } from 'backend/apiUtils/exceptions';

export const createDefaultTeamForUser = async (name: string, userId: string) => {
  return await prisma.team.create({
    data: {
      name: `${name}'s Team`,
      provider: 'GSUITE',
      members: {
        create: {
          user: { connect: { id: userId } },
          roles: { connect: { name: 'Admin' } },
        },
      },
    },
  });
};

export const getResourceTeamMembership = async (req: AuthDecoratedRequest, teamId?: string) => {
  const session = (await getSession({ req })) as ExtendedSession;

  return session?.token.teams.find((userTeam) => userTeam.teamId === teamId);
};

export const ensureUserHasTeamMembership = async (
  req: AuthDecoratedRequest,
  teamMemberId?: string
) => {
  const session = (await getSession({ req })) as ExtendedSession;

  const teamMembership = session?.token.teams.find((userTeam) => userTeam.id === teamMemberId);

  if (!teamMembership || !teamMemberId) {
    throw new NotFoundException();
  }

  return teamMembership;
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
  req: NextApiRequest,
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
