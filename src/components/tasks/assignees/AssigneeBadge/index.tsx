import { HStack, Text } from '@chakra-ui/layout';
import { Avatar, IconButton } from '@chakra-ui/react';
import React from 'react';
import { MdClose } from 'react-icons/md';

import useAppColors from 'hooks/useAppColors';
import { WorkspaceMemberWithUser } from 'types/common';

interface Props {
  editable?: boolean;
  onClick?: (item: WorkspaceMemberWithUser) => void;
  onRemoveClick?: (item: WorkspaceMemberWithUser) => void;
  workspaceMember: WorkspaceMemberWithUser;
  inline?: boolean;
}

const AssigneeBadge = ({ workspaceMember, editable, onClick, onRemoveClick, inline }: Props) => {
  const { bgPrimary, bodyText } = useAppColors();
  return (
    <HStack
      p={inline ? 0 : 1}
      px={inline ? 0 : 2}
      borderRadius="full"
      bg={inline ? 'transparent' : bgPrimary}
      onClick={() => onClick?.(workspaceMember)}
    >
      <Avatar size="2xs" src={workspaceMember?.user.image || ''} />
      <Text color={bodyText} isTruncated fontSize="xs" fontWeight="semibold">
        {workspaceMember?.user.name ?? 'User'}
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
          onClick={() => onRemoveClick?.(workspaceMember)}
        />
      )}
    </HStack>
  );
};

export default AssigneeBadge;
