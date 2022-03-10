import Link from 'next/link';
import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { BiDisc } from 'react-icons/bi';

import NoReleasesSubtle from 'components/releases/ReleaseList/NoReleasesSubtle';
import { hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';

const NoUpcomingReleases = () => {
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const canCreateRelease = hasRequiredPermissions(
    ['CREATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );
  return (
    <NoReleasesSubtle
      icon={<Icon as={BiDisc} fontSize="4xl" />}
      title={'No upcoming releases'}
      description={'Upcoming releases will be shown here.'}
    >
      {canCreateRelease && (
        <Link href={'/releases/new'} passHref>
          <Button variant="link" colorScheme="purple" as={'a'}>
            Create a new release
          </Button>
        </Link>
      )}
    </NoReleasesSubtle>
  );
};

export default NoUpcomingReleases;
