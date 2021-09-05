import { Spinner, Stack } from '@chakra-ui/react';
import NotFound from 'components/releases/specific/NotFound';
import { useRouter } from 'next/router';
import { fetchSingleRelease } from 'queries/releases';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { EnrichedRelease } from 'types';
import { LayoutablePage } from './types';

interface ComponentWithReleaseData {
  releaseData: EnrichedRelease;
}

const withReleaseData = <T extends ComponentWithReleaseData>(
  Component: LayoutablePage<T>
) => {
  const Wrapper = (props: T) => {
    const router = useRouter();
    const releaseId = router.query.id as string;
    const { data: response, isLoading } = useQuery(
      ['releases', releaseId],
      () => fetchSingleRelease(releaseId),
      {
        retry: false,
      }
    );

    if (isLoading) {
      return (
        <Stack
          flex={1}
          height={'100vh'}
          bg="#eee"
          align="center"
          justify="center"
          direction="column"
        >
          <Spinner color="purple.500" size="xl" />
        </Stack>
      );
    } else if (response?.status === 404 || !response?.data) {
      return <NotFound />;
    } else {
      return <Component {...props} releaseData={response?.data} />;
    }
  };

  Wrapper.getLayout = Component.getLayout;

  return Wrapper;
};

export default withReleaseData;
