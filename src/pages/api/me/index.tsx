import { createHandler, Get, NotFoundException, Request } from '@storyofams/next-api-decorators';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { JWT } from 'next-auth/jwt';

import { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';

@requiresAuth()
class MeHandler {
  @Get()
  async me(@Request() req: AuthDecoratedRequest) {
    const session = (await getSession({ req })) as Session & { token: JWT };

    const user = await prisma.user.findUnique({
      where: { id: session?.token?.sub as string },
      include: {
        emailPreferences: true,
        workspaces: {
          include: {
            workspace: true,
            roles: {
              select: {
                name: true,
                permissions: { select: { name: true, id: true } },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}

export default createHandler(MeHandler);
