import { Permission } from '@prisma/client';
import { uniq } from 'lodash';

import { EnrichedWorkspaceMember } from 'types/common';
import { PermissionType } from 'types/permissions';

export const getAllUserPermissions = (member?: EnrichedWorkspaceMember): Permission[] => {
  const roles = member?.roles;

  const permissions = uniq(roles?.map((role) => role.permissions).flat());
  return permissions;
};

export const hasRequiredPermissions = (
  requiredPermissions: PermissionType[],
  member?: EnrichedWorkspaceMember
): boolean => {
  const permissions = getAllUserPermissions(member);

  return permissions?.some((permission) =>
    requiredPermissions.includes(permission.name as PermissionType)
  );
};
