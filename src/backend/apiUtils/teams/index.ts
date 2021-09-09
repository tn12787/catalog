import { User } from '@prisma/client';

import prisma from 'backend/prisma/client';

export const createDefaultTeamForUser = async (user: User) => {
  try {
    const team = await prisma.team.create({
      data: {
        name: `${user?.name}'s Team`,
        provider: 'GSUITE',
        users: {
          create: {
            role: 'ADMIN',
            user: { connect: { id: user?.id as string } },
          },
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};
