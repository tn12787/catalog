import { PrismaClient } from '@prisma/client';

import { distributors } from './distributors';
import { allPermissions } from './permissions';

const prisma = new PrismaClient();

async function seed() {
  // distributors
  await prisma.distributor.createMany({
    data: distributors,
    skipDuplicates: true,
  });

  // permissions
  await prisma.permission.createMany({
    data: allPermissions,
    skipDuplicates: true,
  });

  const viewerData = {
    name: 'Viewer',
    description: 'Can view most resources, cannot create anything',
    permissions: {
      connect: [{ name: 'VIEW_RELEASES' }, { name: 'VIEW_ARTISTS' }, { name: 'VIEW_TEAM' }],
    },
  };

  // Viewer Role
  await prisma.role.upsert({
    create: viewerData,
    update: viewerData,
    where: { name: viewerData.name },
  });

  const workspaceMemberData = {
    name: 'Team Member', // TODO: Rename this to 'Workspace Member'
    description: 'Can update releases, create release tasks, update artist info, etc.',
    permissions: {
      connect: [
        { name: 'VIEW_RELEASES' },
        { name: 'VIEW_ARTISTS' },
        { name: 'VIEW_TEAM' },
        { name: 'UPDATE_RELEASES' },
        { name: 'UPDATE_ARTISTS' },
      ],
    },
  };

  // Workspace Member Role
  await prisma.role.upsert({
    create: workspaceMemberData,
    update: workspaceMemberData,
    where: {
      name: workspaceMemberData.name,
    },
  });

  const adminUpsertData = {
    name: 'Admin',
    description: 'Can create releases, artists, manage user access,',
    permissions: {
      connect: allPermissions,
    },
  };

  // Admin Role
  await prisma.role.upsert({
    create: { ...adminUpsertData },
    update: { ...adminUpsertData },
    where: {
      name: adminUpsertData.name,
    },
  });

  process.exit(0);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
