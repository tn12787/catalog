import { Flex, HStack, ListItem, ListItemProps, Text } from '@chakra-ui/layout';
import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { User } from '@prisma/client';
import { BiCheck } from 'react-icons/bi';
import { Icon } from '@chakra-ui/icon';

import useAppColors from 'hooks/useAppColors';

interface Props extends ListItemProps {
  item: User;
  itemIndex: number;
  highlightedIndex: number;
  selected?: boolean;
}

const AssigneeItem = React.forwardRef<HTMLLIElement, Props>(
  ({ item, itemIndex, highlightedIndex, selected, ...rest }: Props, ref) => {
    const isSelected = itemIndex === highlightedIndex;
    const { bgPrimary } = useAppColors();
    return (
      <ListItem
        ref={ref}
        cursor="pointer"
        py={2}
        px={1}
        bg={isSelected ? bgPrimary : 'transparent'}
        {...rest}
      >
        <HStack>
          <Flex minW="20px">{selected && <Icon fontSize="lg" as={BiCheck} />}</Flex>
          <Avatar size="xs" src={item.image || ''} />
          <Text fontSize="md"> {item.name}</Text>
        </HStack>
      </ListItem>
    );
  }
);

AssigneeItem.displayName = 'AssigneeItem';

export default AssigneeItem;
