import Link from 'next/link';
import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { BiDisc } from 'react-icons/bi';

import NoReleasesSubtle from 'components/releases/ReleaseList/NoReleasesSubtle';
import { hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';

const NoUpcomingReleases = () => {
  return (
    <NoReleasesSubtle
      icon={<Icon as={BiDisc} fontSize="4xl" />}
      title={'No upcoming releases'}
      description={'Upcoming releases will be shown here.'}
    ></NoReleasesSubtle>
  );
};

export default NoUpcomingReleases;
