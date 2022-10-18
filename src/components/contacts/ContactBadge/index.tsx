import { HStack, Text } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { Contact } from '@prisma/client';

import useAppColors from 'hooks/useAppColors';

interface Props {
  editable?: boolean;
  onClick?: (item: Contact) => void;
  onRemoveClick?: (item: Contact) => void;
  contact: Contact;
  inline?: boolean;
}

const ContactBadge = ({ contact, editable, onClick, onRemoveClick, inline }: Props) => {
  const { bgPrimary, bodyText } = useAppColors();
  return (
    <HStack
      p={inline ? 0 : 1}
      px={inline ? 0 : 2}
      borderRadius="full"
      bg={inline ? 'transparent' : bgPrimary}
      onClick={() => onClick?.(contact)}
    >
      <Text color={bodyText} noOfLines={1} fontSize="xs" fontWeight="semibold">
        {contact.name ?? 'Contact'}
      </Text>
      {editable && (
        <IconButton
          p={0}
          size="xs"
          minW={0}
          _hover={{ bg: 'transparent' }}
          minH={0}
          variant="ghost"
          aria-label="remove"
          icon={<MdClose />}
          onClick={() => onRemoveClick?.(contact)}
        />
      )}
    </HStack>
  );
};

export default ContactBadge;
