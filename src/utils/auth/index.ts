import { uniq } from 'lodash';

import { EnrichedWorkspaceMember, PermissionType } from 'types/common';

export const hasRequiredPermissions = (
  requiredPermissions: PermissionType[],
  user?: EnrichedWorkspaceMember
): boolean => {
  const roles = user?.roles;

  const permissions = uniq(roles?.map((role) => role.permissions).flat());

  return permissions?.some((permission) =>
    requiredPermissions.includes(permission.name as PermissionType)
  );
};
