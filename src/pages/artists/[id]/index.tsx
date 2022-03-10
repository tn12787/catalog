import { Stack, Heading } from '@chakra-ui/layout';
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
} from '@chakra-ui/react';
import { BiChevronRight } from 'react-icons/bi';

import DashboardLayout from 'components/layouts/DashboardLayout';
import useAppColors from 'hooks/useAppColors';
import Card from 'components/Card';
import PageHead from 'components/pageItems/PageHead';
import { getSingleServerSideArtist } from 'ssr/artists/getSingleServerSideArtist';
import { ArtistResponse } from 'types/common';
import useSingleArtist from 'hooks/data/artists/useSingleArtist';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import ArtistOverview from 'components/artists/specific/ArtistOverview';
import ArtistReleases from 'components/artists/specific/ArtistReleases';

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
          <ArtistOverview artist={artist} isLoading={isLoading}></ArtistOverview>
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
            <ArtistReleases artist={artistData} isLoading={isLoading} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getSingleServerSideArtist;

SingleArtist.getLayout = () => DashboardLayout;

export default SingleArtist;
