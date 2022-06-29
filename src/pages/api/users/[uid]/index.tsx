import {
  Body,
  createHandler,
  NotFoundException,
  Put,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import type { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateUserDto } from 'backend/models/users/update';

@requiresAuth()
class UserHandler {
  @Put()
  async updateUser(
    @PathParam('uid') id: string,
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
        emailPreferences: {
          upsert: {
            create: { reminders: body.emailPreferences?.reminders },
            update: {
              reminders: body.emailPreferences?.reminders,
            },
          },
        },
      },
    });

    return user;
  }
}

export default createHandler(UserHandler);
