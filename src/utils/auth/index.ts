import { uniq } from 'lodash';

import { EnrichedTeamMember, PermissionType } from 'types/common';

export const hasRequiredPermissions = (
  requiredPermissions: PermissionType[],
  user?: EnrichedTeamMember
): boolean => {
  const roles = user?.roles;

  const permissions = uniq(roles?.map((role) => role.permissions).flat());

  return permissions?.some((permission) =>
    requiredPermissions.includes(permission.name as PermissionType)
  );
};
