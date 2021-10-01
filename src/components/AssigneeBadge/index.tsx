import { HStack, Text } from '@chakra-ui/layout';
import { Avatar, Icon, IconButton } from '@chakra-ui/react';
import React from 'react';
import { MdClose } from 'react-icons/md';

import { User } from '.prisma/client';
import useAppColors from 'hooks/useAppColors';

interface Props {
  editable?: boolean;
  onClick?: (item: User) => void;
  onRemoveClick?: (item: User) => void;
  user: User;
}

const AssigneeBadge = ({ user, editable, onClick, onRemoveClick }: Props) => {
  const { bgPrimary } = useAppColors();
  return (
    <HStack
      p={1}
      px={2}
      borderRadius="full"
      bg={bgPrimary}
      onClick={() => onClick?.(user)}
    >
      <Avatar size="2xs" src={user.image || ''} />
      <Text isTruncated fontSize="xs" fontWeight="semibold">
        {' '}
        {user.name}
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
          onClick={() => onRemoveClick?.(user)}
        />
      )}
    </HStack>
  );
};

export default AssigneeBadge;
