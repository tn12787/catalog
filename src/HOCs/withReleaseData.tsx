import { Spinner, Stack } from '@chakra-ui/react';
import NotFound from 'components/releases/specific/NotFound';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { Release } from 'types';
import { LayoutablePage } from './types';

interface ComponentWithReleaseData {
  releaseData: Release;
}

const withReleaseData = <T extends ComponentWithReleaseData>(
  Component: LayoutablePage<T>
) => {
  const Wrapper = (props: T) => {
    const router = useRouter();
    const [notFound, setNotFound] = useState(false);
    const releaseId = router.query.id;
    const releaseRef = useFirestore()
      .collection('releases')
      .doc(releaseId as string);
    const { status, data: releaseData } = useFirestoreDocData(releaseRef, {
      idField: 'id',
    });

    useEffect(() => {
      const checkForExistence = async () => {
        if (status === 'success') {
          const data = await releaseRef.get();
          setNotFound(!data.exists);
        }
      };
      checkForExistence();
    }, [releaseData, status, releaseRef]);

    if (status === 'loading') {
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
    } else if (notFound) {
      return <NotFound />;
    } else {
      return <Component {...props} releaseData={releaseData} />;
    }
  };

  Wrapper.getLayout = Component.getLayout;

  return Wrapper;
};

export default withReleaseData;
