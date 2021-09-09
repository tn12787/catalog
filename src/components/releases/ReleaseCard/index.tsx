import {
  Text,
  Image,
  Flex,
  Button,
  Skeleton,
  HStack,
  Stack,
} from '@chakra-ui/react';
import ReleaseStatusBadge from 'components/releases/ReleaseStatusBadge';
import React from 'react';
import { EnrichedRelease } from 'types';
import ReleaseArtist from './ReleaseArtist';
import ReleaseDate from './ReleaseDate';
import ReleaseType from './ReleaseType';
import useAppColors from 'hooks/useAppColors';

interface ReleaseCardProps {
  releaseData: EnrichedRelease;
  loading?: boolean;
}

const ReleaseCard = ({ releaseData, loading }: ReleaseCardProps) => {
  const { border, bgSecondary } = useAppColors();

  return (
    <Flex
      my={'11px'}
      overflow="hidden"
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
      borderRadius={'13px'}
      border="1px solid"
      borderColor={border}
      width="100%"
      bg={bgSecondary}
      pb={{ base: '10px', md: 0 }}
    >
      <Skeleton isLoaded={!loading} w={{ base: '100%', md: 'auto' }}>
        <Image
          src={
            releaseData.artwork?.url ||
            'https://semantic-ui.com/images/wireframe/image.png'
          }
          alt="this is an image"
          width={{ base: '100%', md: '170px' }}
          minW={{ base: '100%', md: '170px' }}
          height="170px"
          backgroundSize="cover"
          objectFit="cover"
        />
      </Skeleton>
      <Stack spacing={2} width="100%" direction="column" px={5}>
        <Flex
          flex={1}
          align="center"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
        >
          <HStack alignItems="center" direction={{ base: 'column', md: 'row' }}>
            <Skeleton isLoaded={!loading}>
              <Text fontSize="25px" isTruncated fontWeight="semibold">
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
        <Stack>
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
      </Stack>
    </Flex>
  );
};

export default ReleaseCard;
