import { Invite } from '@prisma/client';

export const testInvitation = (extraFields: Partial<Invite>): Invite => {
  return {
    id: 'test-artist-id',
    email: 'test@example.com',
    workspaceId: 'test-workspace-id',
    roleId: 'test-role-id',
    createdAt: new Date(),
    updatedAt: null,
    ...extraFields,
  };
};
