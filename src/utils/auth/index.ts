import { uniq } from 'lodash';

import { EnrichedTeamUser, PermissionType } from 'types';

export const hasRequiredPermissions = (
  requiredPermissions: PermissionType[],
  user?: EnrichedTeamUser
): boolean => {
  const roles = user?.roles;

  const permissions = uniq(roles?.map((role) => role.permissions).flat());

  return permissions?.some((permission) =>
    requiredPermissions.includes(permission.name as PermissionType)
  );
};
