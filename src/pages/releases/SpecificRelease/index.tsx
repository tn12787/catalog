import { Spinner, Stack } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import HeaderSection from './HeaderSection';
import Summary from './Summary';

interface SpecificReleaseParams {
  releaseId: string;
}

const SpecificRelease = () => {
  const { releaseId } = useParams<SpecificReleaseParams>();
  const releaseRef = useFirestore().collection('releases').doc(releaseId);
  const { status, data: releaseData } = useFirestoreDocData(releaseRef);

  if (status === 'loading') {
    return (
      <Stack flex={1} bg="#eee" align="center" direction="column">
        <Spinner />
      </Stack>
    );
  }

  return (
    <Stack flex={1} bg="#eee" align="center" direction="column">
      <Stack spacing={4} width="100%" maxW={'900px'}>
        <HeaderSection releaseData={releaseData} />
        <Summary releaseData={releaseData} />
      </Stack>
    </Stack>
  );
};

export default SpecificRelease;
