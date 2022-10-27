import {
  Body,
  createHandler,
  NotFoundException,
  Patch,
  Post,
  Put,
  Req,
  ValidationPipe,
} from 'next-api-decorators';

import { computeNewTrackOrdering } from './../../../../../utils/tracks/index';

import { CopyReleaseTrackDto } from 'backend/models/tracks/update';
import type { AuthDecoratedRequest } from 'types/auth';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { CreateReleaseTrackDto } from 'backend/models/tracks/create';
import { ChangeTrackOrderingDto } from 'backend/models/tracks/ordering';

@requiresAuth()
class ReleaseTrackHandler {
  @Post()
  async createTrack(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateReleaseTrackDto,
    @PathParam('releaseId') id: string
  ) {
    const release = await prisma.release.findUnique({
      where: { id },
      select: { workspaceId: true, tracks: true },
    });

    if (!release) throw new NotFoundException();

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], release?.workspaceId);

    await prisma.release.update({
      where: { id },
      data: {
        tracks: {
          create: {
            index: release.tracks.length,
            workspaceId: release?.workspaceId,
            name: body.name,
            lyrics: body.lyrics,
            mainArtists: {
              connect: body.mainArtists?.map((id) => ({ id })),
            },
            featuringArtists: {
              connect: body.featuringArtists?.map((id) => ({ id })),
            },
          },
        },
      },
    });
  }

  @Put()
  async copyTracks(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CopyReleaseTrackDto,
    @PathParam('releaseId') id: string
  ) {
    const release = await prisma.release.findUnique({
      where: { id },
      select: { workspaceId: true, tracks: true },
    });

    if (!release) throw new NotFoundException();

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], release?.workspaceId);

    const tracksToCopy = await prisma.track.findMany({
      where: { id: { in: body.ids } },
      include: {
        mainArtists: true,
        featuringArtists: true,
      },
    });

    await prisma.release.update({
      where: { id },
      data: {
        tracks: {
          createMany: {
            data: tracksToCopy.map((track, i) => ({
              index: release.tracks.length + i,
              workspaceId: release.workspaceId,
              name: track.name,
              lyrics: track.lyrics,
              mainArtists: {
                connect: track.mainArtists.map((artist) => ({ id: artist.id })),
              },
              featuringArtists: {
                connect: track.featuringArtists.map((artist) => ({ id: artist.id })),
              },
            })),
          },
        },
      },
    });
  }

  @Patch()
  async updateTrackOrder(
    @Req() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: ChangeTrackOrderingDto,
    @PathParam('releaseId') id: string
  ) {
    const release = await prisma.release.findUnique({
      where: { id },
      select: { workspaceId: true, tracks: true },
    });

    if (!release) throw new NotFoundException();

    await checkRequiredPermissions(req, ['UPDATE_RELEASES'], release?.workspaceId);

    const newTracks = computeNewTrackOrdering(release.tracks, body.id, body.newIndex);

    await prisma.$transaction(
      newTracks.map((track) =>
        prisma.track.update({ where: { id: track.id }, data: { index: track.index } })
      )
    );
  }
}

export default createHandler(ReleaseTrackHandler);
