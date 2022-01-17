import { uniq } from 'lodash';
import { NotFoundException } from '@storyofams/next-api-decorators';
import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

import prisma from 'backend/prisma/client';
import { PermissionType, ExtendedSession } from 'types';
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

export const checkRequiredPermissions = async (
  req: NextApiRequest,
  permissions: PermissionType[],
  resourceTeam?: string
) => {
  const session = (await getSession({ req })) as ExtendedSession;

  const team = session?.token.teams.find((userTeam) => userTeam.teamId === resourceTeam);

  if (!team || !resourceTeam) {
    throw new NotFoundException();
  }

  const permissionsForTeam = uniq(
    team.roles.map((item) => item.permissions.map((permission) => permission.name)).flat(2)
  );

  if (
    !permissionsForTeam.some((permission) => permissions.includes(permission as PermissionType))
  ) {
    throw new ForbiddenException();
  }
};
