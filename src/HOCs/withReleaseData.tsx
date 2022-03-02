import { Spinner, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import { LayoutablePage } from './types';

import { ClientRelease } from 'types/common';
import { fetchSingleRelease } from 'queries/releases';
import NotFound from 'components/releases/specific/NotFound';
import useExtendedSession from 'hooks/useExtendedSession';

interface ComponentWithReleaseData {
  releaseData: ClientRelease;
}

const withReleaseData = <T extends ComponentWithReleaseData>(Component: LayoutablePage<T>) => {
  const Wrapper = (props: Omit<T, 'releaseData'>) => {
    const router = useRouter();
    const releaseId = router.query['id'] as string;
    const { currentWorkspace: currentTeam } = useExtendedSession();
    const { data: response, isLoading } = useQuery(
      ['releases', currentTeam, releaseId],
      () => fetchSingleRelease(releaseId),
      { enabled: !!releaseId }
    );

    if (isLoading) {
      return (
        <Stack flex={1} height={'100vh'} align="center" justify="center" direction="column">
          <Spinner color="purple.500" size="xl" />
        </Stack>
      );
    } else if (response?.status === 404 || !response?.data) {
      return <NotFound />;
    } else {
      const overallProps = { ...props, releaseData: response.data } as T;
      return <Component {...overallProps} />;
    }
  };

  Wrapper.getLayout = Component.getLayout;

  return Wrapper;
};

export default withReleaseData;
