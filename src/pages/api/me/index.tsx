import {
  Body,
  createHandler,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { NextApiRequest } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { JWT } from 'next-auth/jwt';

import prisma from 'backend/prisma/client';
import requiresAuth from 'backend/apiUtils/auth';

@requiresAuth()
class MeHandler {
  @Get()
  async me(@Request() req: NextApiRequest) {
    const session = (await getSession({ req })) as Session & { token: JWT };

    const user = await prisma.user.findUnique({
      where: { email: session?.token.email as string },
      include: {
        teams: { include: { team: true } },
      },
    });

    return user;
  }
}

export default createHandler(MeHandler);
