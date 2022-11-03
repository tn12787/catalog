import { HStack, Text } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { MdClose } from 'react-icons/md';

import useAppColors from 'hooks/useAppColors';
import { ArtistResponse } from 'types/common';

interface Props {
  editable?: boolean;
  onClick?: (item: ArtistResponse) => void;
  onRemoveClick?: (item: ArtistResponse) => void;
  artist: ArtistResponse;
  inline?: boolean;
}

const ArtistBadge = ({ artist, editable, onClick, onRemoveClick, inline }: Props) => {
  const { bgPrimary, bodyText } = useAppColors();
  return (
    <HStack
      p={inline ? 0 : 1}
      px={inline ? 0 : 2}
      borderRadius="full"
      bg={inline ? 'transparent' : bgPrimary}
      onClick={() => onClick?.(artist)}
    >
      <Text color={bodyText} noOfLines={1} fontSize="xs" fontWeight="semibold">
        {artist.name ?? 'Artist'}
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
          onClick={() => onRemoveClick?.(artist)}
        />
      )}
    </HStack>
  );
};

export default ArtistBadge;
