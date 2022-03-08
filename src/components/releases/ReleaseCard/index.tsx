import React from 'react';
import NextLink from 'next/link';
import { Skeleton } from '@chakra-ui/skeleton';
import { Flex, Stack, HStack, Link, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';

import SingleReleaseMenu from '../SingleReleaseMenu';

import ReleaseArtist from './ReleaseArtist';
import ReleaseDate from './ReleaseDate';
import ReleaseType from './ReleaseType';

import { ClientRelease } from 'types/common';
import ReleaseStatusBadge from 'components/releases/ReleaseStatusBadge';
import useAppColors from 'hooks/useAppColors';

interface ReleaseCardProps {
  releaseData: ClientRelease;
  loading?: boolean;
}

const ReleaseCard = ({ releaseData, loading }: ReleaseCardProps) => {
  const { border, bgSecondary } = useAppColors();

  const artworkTask = releaseData.artwork;

  return (
    <Flex
      overflow="hidden"
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
      borderRadius={'lg'}
      border="1px solid"
      borderColor={border}
      width="100%"
      bg={bgSecondary}
      pb={{ base: '10px', md: 0 }}
    >
      <Skeleton isLoaded={!loading} w={{ base: '100%', md: 'auto' }}>
        <Image
          src={artworkTask?.url || 'https://semantic-ui.com/images/wireframe/image.png'}
          alt="this is an image"
          width={{ base: '100%', md: '170px' }}
          minW={{ base: '100%', md: '170px' }}
          height={{ base: '220px', md: '170px' }}
          backgroundSize="cover"
          objectFit="cover"
          borderRight="1px solid"
          borderColor={border}
        />
      </Skeleton>
      <Stack spacing={2} py={{ base: 3, md: 0 }} width="100%" direction="column" px={5}>
        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
          <HStack alignItems="center" direction={{ base: 'column', md: 'row' }}>
            <Skeleton isLoaded={!loading}>
              <NextLink passHref href={`/releases/${releaseData.id}`}>
                <Text fontSize={'2xl'} as={Link} isTruncated fontWeight="semibold">
                  {releaseData.name}
                </Text>
              </NextLink>
            </Skeleton>
            <Skeleton display="flex" alignItems="center" isLoaded={!loading}>
              <ReleaseStatusBadge releaseData={releaseData} />
            </Skeleton>
          </HStack>
          <SingleReleaseMenu releaseData={releaseData} isLoading={loading} />
        </Stack>
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
