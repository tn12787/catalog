import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { BiChevronRight } from 'react-icons/bi';
import NextLink from 'next/link';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import ArtistList from 'components/artists/ArtistList';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import PageHead from 'components/pageItems/PageHead';
import useArtists from 'hooks/data/artists/useArtists';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

const Artists = () => {
  const { bgPrimary } = useAppColors();
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();
  const { data: artists, isLoading } = useArtists();
  const { workspace, isLoading: isWorkspaceLoading } = useCurrentWorkspace();

  const canCreateArtists = hasRequiredPermissions(
    ['CREATE_ARTISTS'],
    workspaceMemberships?.[currentWorkspace]
  );

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Artists" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Breadcrumb fontSize="sm" separator={<BiChevronRight color="gray.500" />}>
          <BreadcrumbItem>
            <Skeleton isLoaded={!isWorkspaceLoading}>
              <NextLink passHref href={`/overview`}>
                <BreadcrumbLink>{workspace?.name ?? 'loading'}</BreadcrumbLink>
              </NextLink>
            </Skeleton>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <NextLink passHref href={'/artists'}>
              <BreadcrumbLink fontWeight="bold">Artists</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Stack direction="row" align="center" justify="space-between">
          <Heading size="2xl" fontWeight="black" alignSelf="flex-start">
            Artists
          </Heading>
          {canCreateArtists && (
            <Button href={'/artists/new'} colorScheme="purple" as={'a'}>
              Add Artist
            </Button>
          )}
        </Stack>
        <Stack>
          <ArtistList artists={artists} search={''} loading={isLoading} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

Artists.getLayout = () => DashboardLayout;

export default Artists;
