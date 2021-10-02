import { Body, createHandler, Put, Request, ValidationPipe } from '@storyofams/next-api-decorators';
import { NextApiRequest } from 'next';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateUserDto } from 'backend/models/users/update';

@requiresAuth()
class TeamHandler {
  @Put()
  async updateUser(
    @PathParam('id') id: string,
    @Body(ValidationPipe) body: UpdateUserDto,
    @Request() req: NextApiRequest
  ) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
      },
    });

    return user;
  }
}

export default createHandler(TeamHandler);
