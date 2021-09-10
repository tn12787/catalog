import { uniq } from 'lodash';

import { EnrichedTeamUser } from 'types';

export const hasRequiredPermissions = (
  requiredPermissions: string[],
  user?: EnrichedTeamUser
): boolean => {
  const roles = user?.roles;

  const permissions = uniq(roles?.map((role) => role.permissions).flat());

  return permissions?.some((permission) =>
    requiredPermissions.includes(permission.name)
  );
};
