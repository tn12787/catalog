import RoleSelect from 'components/workspaces/members/roles/RoleSelect';
import { WorkspaceMemberWithUserAndRoles } from 'types/common';
import { FormDatum } from 'types/forms';

export const buildManageUserConfig = (): FormDatum<WorkspaceMemberWithUserAndRoles>[] => [
  {
    name: 'roles',
    label: 'Select roles',
    type: 'select',
    extraProps: {
      placeholder: 'Select a role...',
    },
    CustomComponent: RoleSelect,
  },
];
