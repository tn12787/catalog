import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const allPermissions = [
  { name: 'CREATE_RELEASES' },
  { name: 'UPDATE_RELEASES' },
  { name: 'DELETE_RELEASES' },
  { name: 'VIEW_RELEASES' },

  { name: 'CREATE_ARTISTS' },
  { name: 'UPDATE_ARTISTS' },
  { name: 'DELETE_ARTISTS' },
  { name: 'VIEW_ARTISTS' },

  { name: 'CREATE_ROLES' },
  { name: 'UPDATE_ROLES' },
  { name: 'DELETE_ROLES' },
  { name: 'VIEW_ROLES' },

  { name: 'INVITE_USERS' },
  { name: 'DELETE_USERS' },
  { name: 'UPDATE_USERS' },
  { name: 'VIEW_USERS' },

  { name: 'VIEW_TEAM' },
  { name: 'UPDATE_TEAM' },
  { name: 'DELETE_TEAM' },
];

async function seed() {
  const permissions = await prisma.permission.createMany({
    data: allPermissions,
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

  process.exit(0);

  console.log({ permissions, viewer, teamMember, admin });
}

// seed()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

seed();

export { seed };

export default seed;
