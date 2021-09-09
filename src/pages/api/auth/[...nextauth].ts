import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { User } from '@prisma/client';

import { createDefaultTeamForUser } from 'backend/apiUtils/teams';
import prisma from 'backend/prisma/client';

export default NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
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

      return { ...token, userData: { user, profile } };
    },
    async session(session, token) {
      // Add property to session, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return { ...session, token };
    },
  },
  adapter: PrismaAdapter(prisma),
});
