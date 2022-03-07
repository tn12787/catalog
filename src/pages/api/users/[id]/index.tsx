import { Body, createHandler, Put, ValidationPipe } from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateUserDto } from 'backend/models/users/update';

@requiresAuth()
class UserHandler {
  @Put()
  async updateUser(@PathParam('id') id: string, @Body(ValidationPipe) body: UpdateUserDto) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        segment: body.segment,
      },
    });

    return user;
  }
}

export default createHandler(UserHandler);
