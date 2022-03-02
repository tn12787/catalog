import { Stack, Heading, Text, Link as ChakraLink } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
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
import { fetchSingleArtist } from 'queries/artists';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import Card from 'components/Card';
import PageHead from 'components/pageItems/PageHead';
import ReleaseList from 'components/releases/ReleaseList';
import useExtendedSession from 'hooks/useExtendedSession';

const SingleArtist = () => {
  const router = useRouter();
  const artistId = router.query['id'] as string;
  const { bgPrimary } = useAppColors();
  const { workspaces, currentWorkspace } = useExtendedSession();

  const { data: response, isLoading } = useQuery(
    ['artists', artistId],
    () => fetchSingleArtist(artistId),
    { enabled: !!artistId }
  );

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title={response?.data?.name ?? 'Artist Overview'} />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Breadcrumb fontSize="sm" separator={<BiChevronRight color="gray.500" />}>
          <BreadcrumbItem>
            <Link passHref href={`/overview`}>
              <BreadcrumbLink>{workspaces?.[currentWorkspace]?.workspace.name}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link passHref href={'/artists'}>
              <BreadcrumbLink>Artists</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink fontWeight="bold" href={router.pathname}>
              {response?.data?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Stack direction="row" align="center" justify="space-between">
          <Skeleton isLoaded={!isLoading}>
            <Heading as="h1" size="2xl" fontWeight="black" alignSelf="flex-start">
              {response?.data.name}
            </Heading>
          </Skeleton>
        </Stack>

        <Stack spacing="20px">
          <Card>
            <Heading size="sm">Basic Info</Heading>
            <Text>{response?.data?.legalName}</Text>
            <ChakraLink href={response?.data.spotifyUrl as string} isExternal>
              Spotify
            </ChakraLink>
          </Card>
          <Stack spacing={4}>
            <Heading size="lg">Releases</Heading>
            <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
              <Card w="100%">
                <Stat>
                  <StatLabel>Lifetime Releases</StatLabel>
                  <StatNumber>
                    {
                      response?.data.releases?.filter(
                        (item) => new Date(item.targetDate) < new Date()
                      ).length
                    }
                  </StatNumber>
                </Stat>
              </Card>
              <Card w="100%">
                <Stat>
                  <StatLabel>Year-to-date (YTD)</StatLabel>
                  <StatNumber>
                    {
                      response?.data.releases?.filter(
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
                      response?.data.releases?.filter(
                        (item) => new Date(item.targetDate) > new Date()
                      ).length
                    }
                  </StatNumber>
                </Stat>
              </Card>
            </Stack>
            <Heading size="md">Catalog</Heading>
            <ReleaseList
              search=""
              releases={
                response?.data?.releases?.map((item) => ({
                  ...item,
                  artist: { name: response.data.name },
                })) ?? []
              }
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

SingleArtist.getLayout = () => DashboardLayout;

export default SingleArtist;
