import { HStack, Text } from '@chakra-ui/react';
import { ContactLabel } from '@prisma/client';
import React from 'react';

import { shouldBeDark } from 'utils/color';

type Props = { label: ContactLabel; editable?: string };

const ContactLabelChip = ({ label: { name, color, id }, editable }: Props) => {
  return (
    <HStack px={1} borderRadius="md" key={id} bg={color ?? 'lightGray'}>
      <Text
        fontSize={'xs'}
        color={shouldBeDark(color ?? 'lightGray') ? 'gray.900' : 'white'}
        fontWeight="semibold"
      >
        {name}
      </Text>
    </HStack>
  );
};

export default ContactLabelChip;
