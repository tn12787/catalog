import { Text, Image, Flex, Icon, Button } from '@chakra-ui/react';
import React from 'react';
import { ReleaseType } from 'types';
import { FiCalendar, FiDisc, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface ReleaseCardProps {
  id: string;
  title: string;
  artist: string;
  targetDate: string;
  type: ReleaseType;
  img?: string;
}

const ReleaseCard = ({
  id,
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
    maxH="150px"
  >
    <Image
      src={img}
      alt="this is an image"
      width="150px"
      height="150px"
      backgroundSize="cover"
    />
    <Flex width="100%" direction="column" p={5} py={1}>
      <Flex flex={1} align="center" justify="space-between" py={1}>
        <Text pl={'2px'} fontSize="25px" color="charcoal" fontWeight="semibold">
          {title}
        </Text>
        <Button
          py={'6px'}
          px={6}
          as={Link}
          to={`/releases/${id}`}
          height="auto"
          fontSize="15px"
          variant="outline"
          colorScheme="purple"
        >
          View Details
        </Button>
      </Flex>
      <Flex align="center" color="softCharcoal" my={1}>
        <Icon fontSize="22px" as={FiUser} mr={2} />
        <Text fontSize="14px">{artist}</Text>
      </Flex>
      <Flex align="center" color="mist" my={1}>
        <Icon fontSize="22px" as={FiDisc} mr={2} />
        <Text fontSize="14px">{type}</Text>
      </Flex>
      <Flex align="center" color="mist" my={1}>
        <Icon fontSize="22px" as={FiCalendar} mr={2} />
        <Text fontSize="14px">{targetDate}</Text>
      </Flex>
    </Flex>
  </Flex>
);

export default ReleaseCard;
