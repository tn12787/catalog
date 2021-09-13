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
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
        },
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, isNewUser }) {
      try {
        const userTeams = await prisma.teamUser.findMany({
          where: { userId: token.sub as string },
          select: {
            teamId: true,
            team: {
              select: { name: true, id: true },
            },
            roles: {
              select: { name: true, permissions: { select: { name: true } } },
            },
          },
        });

        if (isNewUser || !userTeams?.length) {
          await createDefaultTeamForUser(
            token.name as string,
            token.sub as string
          );
        }

        return { ...token, teams: userTeams };
      } catch (e) {
        return { error: e };
      }
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return { ...session, token, user };
    },
  },
  adapter: PrismaAdapter(prisma),
});
