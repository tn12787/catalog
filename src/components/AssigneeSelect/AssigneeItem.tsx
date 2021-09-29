import { ListItem, ListItemProps } from '@chakra-ui/layout';
import React from 'react';

import { TeamUserWithUser } from 'components/teams/TeamMembersTable/types';

interface Props extends ListItemProps {
  item: TeamUserWithUser;
  itemIndex: number;
  highlightedIndex: number;
}

const AssigneeItem = ({
  item,
  itemIndex,
  highlightedIndex,
  ...rest
}: Props) => {
  const isSelected = itemIndex === highlightedIndex;
  return (
    <ListItem bg={isSelected ? 'gray.50' : 'transparent'} {...rest}>
      {item.user.name}
    </ListItem>
  );
};

export default AssigneeItem;
