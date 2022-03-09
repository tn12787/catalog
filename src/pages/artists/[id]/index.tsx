import { Stack, Heading, Text, Link as ChakraLink } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Stat,
  StatLabel,
  StatNumber,
  Image,
} from '@chakra-ui/react';
import { BiChevronRight } from 'react-icons/bi';
import { FiExternalLink, FiInstagram } from 'react-icons/fi';
import { SiLinktree } from 'react-icons/si';

import DashboardLayout from 'components/layouts/DashboardLayout';
import useAppColors from 'hooks/useAppColors';
import Card from 'components/Card';
import PageHead from 'components/pageItems/PageHead';
import ReleaseList from 'components/releases/ReleaseList';
import { getSingleServerSideArtist } from 'ssr/artists/getSingleServerSideArtist';
import { ArtistResponse } from 'types/common';
import useSingleArtist from 'hooks/data/artists/useSingleArtist';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

type Props = {
  artist: ArtistResponse;
};

const SingleArtist = ({ artist }: Props) => {
  const router = useRouter();
  const artistId = router.query?.['id'] as string;
  const { bgPrimary } = useAppColors();
  const { workspace, isLoading: isWorkspaceLoading } = useCurrentWorkspace();
  const { data: artistData, isLoading } = useSingleArtist(artistId, { initialData: artist });

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title={artistData?.name ?? 'Artist Overview'} />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Breadcrumb fontSize="sm" separator={<BiChevronRight color="gray.500" />}>
          <BreadcrumbItem>
            <Skeleton isLoaded={!isWorkspaceLoading}>
              <Link passHref href={`/overview`}>
                <BreadcrumbLink>{workspace?.name}</BreadcrumbLink>
              </Link>
            </Skeleton>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link passHref href={'/artists'}>
              <BreadcrumbLink>Artists</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink fontWeight="bold" href={router.pathname}>
              {artistData?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Stack direction="row" align="center" justify="space-between">
          <Skeleton isLoaded={!isLoading}>
            <Heading as="h1" size="2xl" fontWeight="black" alignSelf="flex-start">
              {artistData?.name}
            </Heading>
          </Skeleton>
        </Stack>

        <Stack spacing="20px">
          <Card>
            <Stack spacing={6} direction={{ base: 'column', lg: 'row' }}>
              <Image
                rounded="lg"
                maxHeight="400px"
                maxWidth="400px"
                objectFit="cover"
                alt="artistPic"
                src={
                  artist.imageUrl ??
                  'https://www.theatromarrakech.com/wp-content/plugins/urvenue-plugin/images/placeholder.artist.jpg'
                }
              ></Image>
              <Stack direction={{ base: 'column' }}>
                <Heading size="sm">Basic Info</Heading>
                <Text>{artistData?.legalName}</Text>
                {artistData?.spotifyId && (
                  <ChakraLink
                    href={`https://open.spotify.com/artist/${artistData?.spotifyId}`}
                    isExternal
                  >
                    Spotify
                    <FiExternalLink />
                  </ChakraLink>
                )}
                {artistData?.instagramUsername && (
                  <ChakraLink
                    fontWeight={'medium'}
                    href={`https://www.instagram.com/${artistData?.instagramUsername}`}
                    isExternal
                  >
                    <FiInstagram />
                    {artistData?.instagramUsername}
                    <FiExternalLink />
                  </ChakraLink>
                )}
                {artistData?.linkTreeUrl && (
                  <ChakraLink href={artistData?.linkTreeUrl} isExternal>
                    <SiLinktree />
                    Linktree
                    <FiExternalLink />
                  </ChakraLink>
                )}
              </Stack>
            </Stack>
          </Card>
          <Stack spacing={4}>
            <Heading size="lg">Releases</Heading>
            <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
              <Card w="100%">
                <Stat>
                  <StatLabel>Lifetime Releases</StatLabel>
                  <StatNumber>
                    {
                      artistData?.releases?.filter((item) => new Date(item.targetDate) < new Date())
                        .length
                    }
                  </StatNumber>
                </Stat>
              </Card>
              <Card w="100%">
                <Stat>
                  <StatLabel>Year-to-date (YTD)</StatLabel>
                  <StatNumber>
                    {
                      artistData?.releases?.filter(
                        (item) =>
                          new Date(item.targetDate) < new Date() &&
                          new Date(item.targetDate).getFullYear() === new Date().getFullYear()
                      ).length
                    }
                  </StatNumber>
                </Stat>
              </Card>
              <Card w="100%">
                <Stat>
                  <StatLabel>Upcoming</StatLabel>
                  <StatNumber>
                    {
                      artistData?.releases?.filter((item) => new Date(item.targetDate) > new Date())
                        .length
                    }
                  </StatNumber>
                </Stat>
              </Card>
            </Stack>
            <Heading size="md">Catalog</Heading>
            <ReleaseList
              search=""
              releases={
                artistData?.releases?.map((item) => ({
                  ...item,
                  artist: { name: artistData?.name },
                })) ?? []
              }
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getSingleServerSideArtist;

SingleArtist.getLayout = () => DashboardLayout;

export default SingleArtist;
