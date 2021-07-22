import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

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
    console.log(team);
  } catch (e) {
    console.log(e);
  }
};
