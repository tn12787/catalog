import { HStack, Text } from '@chakra-ui/layout';
import { Avatar, IconButton } from '@chakra-ui/react';
import React from 'react';
import { MdClose } from 'react-icons/md';

import useAppColors from 'hooks/useAppColors';
import { TeamMemberWithUser } from 'types';

interface Props {
  editable?: boolean;
  onClick?: (item: TeamMemberWithUser) => void;
  onRemoveClick?: (item: TeamMemberWithUser) => void;
  teamMember: TeamMemberWithUser;
}

const AssigneeBadge = ({ teamMember, editable, onClick, onRemoveClick }: Props) => {
  const { bgPrimary } = useAppColors();
  return (
    <HStack p={1} px={2} borderRadius="full" bg={bgPrimary} onClick={() => onClick?.(teamMember)}>
      <Avatar size="2xs" src={teamMember.user.image || ''} />
      <Text isTruncated fontSize="xs" fontWeight="semibold">
        {teamMember.user.name}
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
          onClick={() => onRemoveClick?.(teamMember)}
        />
      )}
    </HStack>
  );
};

export default AssigneeBadge;
