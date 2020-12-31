import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Text, Box, Image, Flex } from '@chakra-ui/react';
import React from 'react';
import { ReleaseType } from 'types';

interface ReleaseCardProps {
  title: string;
  artist: string;
  targetDate: string;
  type: ReleaseType;
  img?: string;
}

const ReleaseCard = ({
  title,
  img,
  type,
  artist,
  targetDate,
}: ReleaseCardProps) => (
  // TODO: Get these aligning properly
  <Flex
    my={'11px'}
    overflow="hidden"
    alignItems="center"
    bg="white"
    borderRadius={'13px'}
    width="100%"
  >
    <Image
      src={img}
      alt="this is an image"
      width="150px"
      height="150px"
      backgroundSize="cover"
    />
    <Box p={5} py={1}>
      <Text fontSize="25px" fontWeight="semibold">
        {title}
      </Text>
      <Flex align="center" mt={1}>
        <InfoOutlineIcon mr={1} />
        <Text fontSize="14px">{artist}</Text>
      </Flex>
      <Flex align="center" mt={3}>
        <InfoOutlineIcon mr={1} />
        <Text fontSize="14px">{type}</Text>
      </Flex>
      <Flex align="center" mt={3}>
        <InfoOutlineIcon mr={1} />
        <Text fontSize="14px">{targetDate}</Text>
      </Flex>
    </Box>
  </Flex>
);

export default ReleaseCard;
