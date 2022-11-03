import {
  Body,
  createHandler,
  Delete,
  NotFoundException,
  Patch,
  Req,
  ValidationPipe,
} from 'next-api-decorators';

import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { RequiredQuery } from 'backend/apiUtils/decorators/routing';
import type { AuthDecoratedRequest } from 'types/auth';
import { UpdateReleaseTrackDto } from 'backend/models/tracks/update';

@requiresAuth()
class IndividualTrackHandler {
  @Patch()
  async editTrack(
    @Req() req: AuthDecoratedRequest,
    @RequiredQuery('id') id: string,
    @Body(ValidationPipe) body: UpdateReleaseTrackDto
  ) {
    const track = await prisma.track.findUnique({
      where: { id },
      include: { release: true },
    });

    if (!track) throw new NotFoundException();

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], track.release.workspaceId);

    const updated = await prisma.track.update({
      where: { id },
      data: {
        name: body.name,
        lyrics: body.lyrics,
        mainArtists: {
          set: body.mainArtists?.map((id) => ({ id })),
        },
        featuringArtists: {
          set: body.featuringArtists?.map((id) => ({ id })),
        },
      },
    });

    return updated;
  }

  @Delete()
  async deleteTrack(@Req() req: AuthDecoratedRequest, @RequiredQuery('id') id: string) {
    const track = await prisma.track.findUnique({
      where: { id },
      include: { release: true },
    });

    if (!track) throw new NotFoundException();

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], track.release.workspaceId);

    const deleted = await prisma.track.delete({
      where: { id },
    });

    return deleted;
  }
}
export default createHandler(IndividualTrackHandler);
