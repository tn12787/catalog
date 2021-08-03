import {
  Body,
  createHandler,
  Get,
  HttpCode,
  Post,
} from '@storyofams/next-api-decorators';

import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import requiresAuth from 'apiUtils/auth';

@requiresAuth()
class ReleaseListHandler {
  @Get()
  async releases() {
    const posts = await prisma.release.findMany({
      orderBy: {
        targetDate: 'asc',
      },
      include: {
        team: {
          include: { users: { include: { user: true } } },
        },
      },
    });
    return posts;
  }

  @Post()
  @HttpCode(201)
  async createRelease(@Body() body: Prisma.ReleaseCreateInput) {
    const result = await prisma.release.create({
      data: {
        name: body.name,
        type: body.type,
        targetDate: body.targetDate,
        team: body.team,
      },
    });
    return 'Created release';
  }
}

export default createHandler(ReleaseListHandler);
