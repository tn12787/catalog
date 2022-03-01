import { Flex, HStack, ListItem, ListItemProps, Text } from '@chakra-ui/layout';
import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { Icon } from '@chakra-ui/icon';

import useAppColors from 'hooks/useAppColors';
import { ContactWithLabels } from 'types/common';

interface Props extends ListItemProps {
  item: ContactWithLabels;
  itemIndex: number;
  highlightedIndex: number;
  selected?: boolean;
}

const ContactItem = ({ item, itemIndex, highlightedIndex, selected, ...rest }: Props) => {
  const isSelected = itemIndex === highlightedIndex;
  const { bgPrimary } = useAppColors();
  return (
    <ListItem cursor="pointer" py={2} px={1} bg={isSelected ? bgPrimary : 'transparent'} {...rest}>
      <HStack>
        <Flex minW="20px">{selected && <Icon fontSize="lg" as={BiCheck} />}</Flex>
        {/* <Avatar size="xs" src={item.image || ''} /> */}
        <Text fontSize="md"> {item.name}</Text>
      </HStack>
    </ListItem>
  );
};

export default ContactItem;
