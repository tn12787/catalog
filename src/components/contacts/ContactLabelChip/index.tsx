import { HStack, IconButton, Text } from '@chakra-ui/react';
import { ContactLabel } from '@prisma/client';
import React from 'react';
import { MdClose } from 'react-icons/md';

import { shouldBeDark } from 'utils/color';

type Props = {
  label: ContactLabel;
  editable?: string;
  onRemoveClick?: (item: ContactLabel) => void;
};

const ContactLabelChip = ({ label, onRemoveClick, editable }: Props) => {
  return (
    <HStack px={1} borderRadius="md" key={label.id} bg={label.color ?? 'lightGray'}>
      <Text
        fontSize={'xs'}
        color={shouldBeDark(label.color ?? 'lightGray') ? 'gray.900' : 'white'}
        fontWeight="semibold"
      >
        {label.name}
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
          onClick={() => onRemoveClick?.(label)}
        />
      )}
    </HStack>
  );
};

export default ContactLabelChip;
