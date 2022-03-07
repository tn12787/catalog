import {
  Body,
  createHandler,
  NotFoundException,
  Put,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateUserDto } from 'backend/models/users/update';
import { AuthDecoratedRequest } from 'types/common';

@requiresAuth()
class UserHandler {
  @Put()
  async updateUser(
    @PathParam('id') id: string,
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateUserDto
  ) {
    const userId = req.session.token.sub;
    if (id !== userId) throw new NotFoundException();

    const user = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        segment: body.segment,
        image: body.image,
      },
    });

    return user;
  }
}

export default createHandler(UserHandler);
