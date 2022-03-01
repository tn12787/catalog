import { Flex, HStack, ListItem, ListItemProps } from '@chakra-ui/layout';
import React from 'react';
import { ContactLabel } from '@prisma/client';
import { BiCheck } from 'react-icons/bi';
import { Icon } from '@chakra-ui/icon';

import useAppColors from 'hooks/useAppColors';
import ContactLabelChip from 'components/contacts/ContactLabelChip';

interface Props extends ListItemProps {
  item: ContactLabel;
  itemIndex: number;
  highlightedIndex: number;
  selected?: boolean;
}

const ContactLabelItem = ({ item, itemIndex, highlightedIndex, selected, ...rest }: Props) => {
  const isSelected = itemIndex === highlightedIndex;
  const { bgPrimary } = useAppColors();
  return (
    <ListItem cursor="pointer" py={2} px={1} bg={isSelected ? bgPrimary : 'transparent'} {...rest}>
      <HStack>
        <Flex minW="20px">{selected && <Icon fontSize="lg" as={BiCheck} />}</Flex>
        <ContactLabelChip label={item}></ContactLabelChip>
      </HStack>
    </ListItem>
  );
};

export default ContactLabelItem;
