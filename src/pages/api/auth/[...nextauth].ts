import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

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
      if (isNewUser) {
        try {
          prisma.team.create({
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
      }

      return { ...token, account, user, profile };
    },
  },
  adapter: PrismaAdapter(prisma),
});
