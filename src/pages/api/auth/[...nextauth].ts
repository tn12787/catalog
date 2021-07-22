import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient, User } from '@prisma/client';
import { createDefaultTeamForUser } from 'apiUtils/teams';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      const userTeams = await prisma.teamUser.count({
        where: { userId: user?.id as string },
      });
      if (isNewUser || !userTeams) {
        await createDefaultTeamForUser(user as User);
      }

      return { token, user, account, profile };
    },
  },
  adapter: PrismaAdapter(prisma),
});
