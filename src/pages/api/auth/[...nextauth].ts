import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { createDefaultWorkspaceForUser } from 'backend/apiUtils/workspaces';
import prisma from 'backend/prisma/client';

export default NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/welcome',
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
  jwt: {
    signingKey: process.env.JWT_SIGNING_KEY as string,
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, isNewUser }) {
      try {
        const numberOfUserWorkspaces = await prisma.workspaceMember.count({
          where: { userId: token.sub as string },
        });

        if (isNewUser || !numberOfUserWorkspaces) {
          await createDefaultWorkspaceForUser({
            name: token.name as string,
            userId: token.sub as string,
            email: token.email as string,
          });
        }
        return { ...token };
      } catch (e) {
        return { ...token };
      }
    },
    async session({ session, token, user }) {
      try {
        const userWorkspaces = await prisma.workspaceMember.findMany({
          where: { userId: token.sub as string },
          select: {
            id: true,
            workspaceId: true,
            workspace: {
              select: { name: true, id: true },
            },
            roles: {
              select: { name: true, permissions: { select: { name: true } } },
            },
          },
        });
        session.accessToken = token.accessToken;
        return { ...session, token: { ...token, workspaceMemberships: userWorkspaces }, user };
      } catch (e) {
        return session;
      }
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  adapter: PrismaAdapter(prisma),
});
