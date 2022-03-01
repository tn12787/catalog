import React from 'react';
import { Wrap } from '@chakra-ui/react';
import { Role } from '@prisma/client';

import RoleBadge from '../RoleBadge';

import { SelectedItemListProps } from 'components/forms/MultiSelect/types';

const RoleSelectedItems = ({ items, onChange }: SelectedItemListProps<Role>) => {
  return (
    <Wrap>
      {items?.length
        ? items?.map((role) => {
            return (
              <RoleBadge
                onRemoveClick={(removedRole) => {
                  onChange(items?.filter((item) => item?.id !== removedRole.id));
                }}
                editable
                key={role.id}
                role={role}
              />
            );
          })
        : null}
    </Wrap>
  );
};

export default RoleSelectedItems;
