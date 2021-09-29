import { HStack, ListItem, ListItemProps, Text } from '@chakra-ui/layout';
import React from 'react';
import { Avatar } from '@chakra-ui/avatar';

import { TeamUserWithUser } from 'components/teams/TeamMembersTable/types';
import useAppColors from 'hooks/useAppColors';

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
  const { bgPrimary } = useAppColors();
  return (
    <ListItem
      cursor="pointer"
      p={3}
      bg={isSelected ? bgPrimary : 'transparent'}
      {...rest}
    >
      <HStack>
        <Avatar size="xs" src={item.user.image || ''} />
        <Text fontSize="md"> {item.user.name}</Text>
      </HStack>
    </ListItem>
  );
};

export default AssigneeItem;
