import RoleSelect from 'components/teams/members/roles/RoleSelect';
import { TeamMemberWithUserAndRoles } from 'types/common';
import { FormDatum } from 'types/forms';

export const buildManageUserConfig = (): FormDatum<TeamMemberWithUserAndRoles>[] => [
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
