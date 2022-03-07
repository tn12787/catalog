import { CloudProvider, Workspace } from '@prisma/client';

import { EnrichedWorkspaceMember, RoleWithPermission } from 'types/common';

export const testWorkspace = (extraFields: Partial<Workspace>): Workspace => {
  return {
    id: 'test-artist-id',
    name: 'Test Workspace',
    imageUrl: null,
    provider: CloudProvider.GSUITE,
    stripeCustomerId: 'test-stripe-customer-id',
    stripeSubscriptionId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...extraFields,
  };
};

export const testWorkspaceMemberShip = (
  extraFields: Partial<EnrichedWorkspaceMember>
): EnrichedWorkspaceMember => {
  const wsInstance = testWorkspace({});
  return {
    id: 'test-workspace-member-id',
    roles: [] as RoleWithPermission[],
    workspace: wsInstance,
    userId: 'test-user-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    workspaceId: wsInstance.id,
    ...extraFields,
  };
};
