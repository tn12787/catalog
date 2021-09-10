import { uniq } from 'lodash';
import { Session, User } from '@prisma/client';
import { NotFoundException } from '@storyofams/next-api-decorators';
import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

import prisma from 'backend/prisma/client';
import { ExtendedSession } from 'types';
import { ForbiddenException } from 'backend/apiUtils/exceptions';

export const createDefaultTeamForUser = async (user: User) => {
  try {
    const team = await prisma.team.create({
      data: {
        name: `${user?.name}'s Team`,
        provider: 'GSUITE',
        users: {
          create: {
            user: { connect: { id: user?.id as string } },
            roles: { connect: { name: 'Admin' } },
          },
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const checkRequiredPermissions = async (
  req: NextApiRequest,
  permissions: string[],
  resourceTeam?: string
) => {
  const session = (await getSession({ req })) as any as {
    token: ExtendedSession;
  };

  const team = session?.token.userData.teams.find(
    (userTeam) => userTeam.teamId === resourceTeam
  );

  if (!team) {
    throw new NotFoundException();
  }

  const permissionsForTeam = uniq(
    team.roles
      .map((item) => item.permissions.map((permission) => permission.name))
      .flat(2)
  );

  if (
    !permissionsForTeam.some((permission) => permissions.includes(permission))
  ) {
    throw new ForbiddenException();
  }
};
