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
import { getSession } from 'next-auth/react';
import { JWT } from 'next-auth/jwt';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateTeamDto } from 'backend/models/teams/update';

@requiresAuth()
class TeamHandler {
  @Get()
  async team(@PathParam('teamId') id: string) {
    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        users: { include: { roles: true, user: true } },
      },
    });

    return team;
  }

  @Put()
  async updateTeam(
    @PathParam('teamId') id: string,
    @Body(ValidationPipe) body: UpdateTeamDto,
    @Request() req: NextApiRequest
  ) {
    const team = await prisma.team.update({
      where: { id },
      data: {
        name: body.name,
      },
    });

    return team;
  }
}

export default createHandler(TeamHandler);
