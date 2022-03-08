import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import SpotifyProvider from 'next-auth/providers/spotify';
import SlackProvider from 'next-auth/providers/slack';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { sendDynamicEmail } from 'backend/apiUtils/email';
import { createDefaultWorkspaceForUser } from 'backend/apiUtils/workspaces';
import prisma from 'backend/prisma/client';

type VerificationRequestData = {
  url: string;
};

const verificationRequestTemplateId = `d-7b374b8945ef4fde8576ee037151ce2d`;

export default NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/welcome',
    verifyRequest: '/magic-link',
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
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
    }),
    EmailProvider({
      async sendVerificationRequest({ identifier: email, url }) {
        await sendDynamicEmail<VerificationRequestData>({
          to: email,
          templateId: verificationRequestTemplateId,
          dynamicTemplateData: {
            url,
          },
        });
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
