import React from 'react';
import { Button, Heading, Skeleton, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { RiAddFill } from 'react-icons/ri';

import { PaginatedQueryResult } from 'queries/types';
import { ClientRelease } from 'types/common';
import Card from 'components/Card';
import ReleaseList from 'components/releases/ReleaseList';
import NoUpcomingReleases from 'components/releases/ReleaseList/NoUpcomingReleases';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';

type Props = { releases: PaginatedQueryResult<ClientRelease> | undefined; isLoading: boolean };

const OverviewReleases = ({ releases, isLoading }: Props) => {
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const canCreateRelease = hasRequiredPermissions(
    ['CREATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );
  return (
    <Card>
      <Stack direction={{ base: 'column', md: 'row' }} justify={'space-between'}>
        <Heading size="md">Upcoming Releases</Heading>

        {canCreateRelease && (
          <Skeleton isLoaded={!isLoading}>
            <Link href={'/releases/new'} passHref>
              <Button
                variant="outline"
                size="sm"
                iconSpacing={1}
                leftIcon={<RiAddFill fontSize="1.25em" />}
                as={'a'}
              >
                Create new release
              </Button>
            </Link>
          </Skeleton>
        )}
      </Stack>
      <ReleaseList
        isLoading={isLoading}
        EmptyComponent={NoUpcomingReleases}
        search=""
        releases={releases?.results ?? []}
      />
    </Card>
  );
};

export default OverviewReleases;
