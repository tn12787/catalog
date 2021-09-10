import { PrismaClient } from '@prisma/client';

import { distributors } from './distributors';
import { allPermissions } from './permissions';

const prisma = new PrismaClient();

async function seed() {
  const seededDistributors = await prisma.distributor.createMany({
    data: distributors,
    skipDuplicates: true,
  });

  const permissions = await prisma.permission.createMany({
    data: allPermissions,
    skipDuplicates: true,
  });

  const viewer = await prisma.role.create({
    data: {
      name: 'Viewer',
      description: 'Can view most resources, cannot create anything',
      permissions: {
        connect: [
          { name: 'VIEW_RELEASES' },
          { name: 'VIEW_ARTISTS' },
          { name: 'VIEW_TEAM' },
        ],
      },
    },
  });

  const teamMember = await prisma.role.create({
    data: {
      name: 'Team Member',
      description:
        'Can update releases, create release tasks, update artist info, etc.',
      permissions: {
        connect: [
          { name: 'VIEW_RELEASES' },
          { name: 'VIEW_ARTISTS' },
          { name: 'VIEW_TEAM' },
          { name: 'UPDATE_RELEASES' },
          { name: 'UPDATE_ARTISTS' },
        ],
      },
    },
  });

  const admin = await prisma.role.create({
    data: {
      name: 'Admin',
      description: 'Can create releases, artists, manage user access,',
      permissions: {
        connect: allPermissions,
      },
    },
  });

  console.log({ permissions, viewer, teamMember, admin, seededDistributors });

  process.exit(0);
}

seed();

export { seed };

export default seed;
