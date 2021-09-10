import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { User } from '@prisma/client';

import { createDefaultTeamForUser } from 'backend/apiUtils/teams';
import prisma from 'backend/prisma/client';

export default NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
    } as any) as any, // TODO: Fix this when the library is updated
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user, profile, isNewUser }) {
      const userTeams = await prisma.teamUser.findMany({
        where: { userId: user?.id as string },
        include: { team: true },
      });

      if (isNewUser || !userTeams?.length) {
        await createDefaultTeamForUser(user as User);
      }

      return { ...token, userData: { user, profile, teams: userTeams } };
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return { ...session, token, user };
    },
  },
  adapter: PrismaAdapter(prisma),
});
