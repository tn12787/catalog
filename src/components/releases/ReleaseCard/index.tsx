import {
  Text,
  Image,
  Flex,
  Icon,
  Button,
  Link,
  Skeleton,
  HStack,
  Stack,
} from '@chakra-ui/react';
import ReleaseStatusBadge from 'components/releases/ReleaseStatusBadge';
import React, { useRef } from 'react';
import { FiCalendar, FiDisc, FiUser } from 'react-icons/fi';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { Artwork, EnrichedRelease, Release } from 'types';
import ReleaseArtist from './ReleaseArtist';
import ReleaseDate from './ReleaseDate';
import ReleaseType from './ReleaseType';

interface ReleaseCardProps {
  releaseData: EnrichedRelease;
  loading?: boolean;
}

const ReleaseCard = ({ releaseData, loading }: ReleaseCardProps) => {
  return (
    <Flex
      my={'11px'}
      overflow="hidden"
      alignItems="center"
      direction={['column', 'column', 'row']}
      bg="white"
      borderRadius={'13px'}
      border="1px solid #ddd"
      width="100%"
      maxH={['auto', 'auto', '150px']}
    >
      <Skeleton isLoaded={!loading}>
        <Image
          src={
            releaseData.artwork?.url ||
            'https://semantic-ui.com/images/wireframe/image.png'
          }
          alt="this is an image"
          width={['100%', '100%', '150px']}
          minW={['100%', '100%', '150px']}
          height="150px"
          backgroundSize="cover"
          objectFit="cover"
        />
      </Skeleton>
      <Stack spacing={1} width="100%" direction="column" p={5} py={1}>
        <Flex
          flex={1}
          align="center"
          direction={['column', 'column', 'row']}
          justify="space-between"
          py={1}
        >
          <HStack alignItems="center" direction={['column', 'column', 'row']}>
            <Skeleton isLoaded={!loading}>
              <Text fontSize="25px" color="charcoal" fontWeight="semibold">
                {releaseData.name}
              </Text>
            </Skeleton>
            <Skeleton display="flex" alignItems="center" isLoaded={!loading}>
              <ReleaseStatusBadge releaseData={releaseData} />
            </Skeleton>
          </HStack>
          <Skeleton isLoaded={!loading}>
            <Button
              py={'6px'}
              px={6}
              mt={[2, 2, 0]}
              as={'a'}
              href={`/releases/${releaseData.id}`}
              height="auto"
              fontSize="15px"
              variant="outline"
              colorScheme="purple"
            >
              View Details
            </Button>
          </Skeleton>
        </Flex>
        <Skeleton isLoaded={!loading} alignSelf="flex-start">
          <ReleaseArtist releaseData={releaseData} />
        </Skeleton>
        <Skeleton isLoaded={!loading} alignSelf="flex-start">
          <ReleaseType releaseData={releaseData} />
        </Skeleton>
        <Skeleton isLoaded={!loading} alignSelf="flex-start">
          <ReleaseDate releaseData={releaseData} />
        </Skeleton>
      </Stack>
    </Flex>
  );
};

export default ReleaseCard;
