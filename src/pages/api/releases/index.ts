import {
  Body,
  createHandler,
  Get,
  HttpCode,
  ParseDatePipe,
  Post,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { CreateReleaseDto } from 'models/releases/create';

import { Prisma, PrismaClient, ReleaseType } from '@prisma/client';
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
  async createRelease(@Body(ValidationPipe) body: CreateReleaseDto) {
    const result = await prisma.release.create({
      data: {
        name: body.name,
        type: body.type as ReleaseType,
        targetDate: body.targetDate,
        team: {
          connect: { id: body.team },
        },
      },
    });
    return result;
  }
}

export default createHandler(ReleaseListHandler);
