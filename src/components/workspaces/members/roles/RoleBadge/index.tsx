import { HStack, Text } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { Role } from '@prisma/client';

import useAppColors from 'hooks/useAppColors';

interface Props {
  editable?: boolean;
  onClick?: (item: Role) => void;
  onRemoveClick?: (item: Role) => void;
  role: Role;
  inline?: boolean;
}

const RoleBadge = ({ role, editable, onClick, onRemoveClick, inline }: Props) => {
  const { bgPrimary, bodyText } = useAppColors();
  return (
    <HStack
      p={inline ? 0 : 1}
      px={inline ? 0 : 2}
      borderRadius="full"
      bg={inline ? 'transparent' : bgPrimary}
      onClick={() => onClick?.(role)}
    >
      <Text color={bodyText} isTruncated fontSize="xs" fontWeight="semibold">
        {role.name ?? 'Role'}
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
          onClick={() => onRemoveClick?.(role)}
        />
      )}
    </HStack>
  );
};

export default RoleBadge;
