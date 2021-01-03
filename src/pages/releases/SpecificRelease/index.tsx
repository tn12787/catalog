import { Spinner, Stack } from '@chakra-ui/react';
import React from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import HeaderSection from './HeaderSection';
import Summary from './Summary';
import Artwork from './Artwork';
import Distribution from './Distribution';
import Events from './Events';
import EditArtwork from './editing/EditArtwork';
import EditDistribution from './editing/EditDistribution';

export interface SpecificReleaseParams {
  releaseId: string;
}

const SpecificRelease = () => {
  const { releaseId } = useParams<SpecificReleaseParams>();
  const releaseRef = useFirestore().collection('releases').doc(releaseId);
  const { status, data: releaseData } = useFirestoreDocData(releaseRef, {
    idField: 'id',
  });
  let { path } = useRouteMatch();

  if (status === 'loading') {
    return (
      <Stack flex={1} bg="#eee" align="center" direction="column">
        <Spinner />
      </Stack>
    );
  }

  return (
    <Switch>
      <Route path={`${path}/artwork/edit`}>
        <EditArtwork releaseData={releaseData} />
      </Route>
      <Route path={`${path}/distribution/edit`}>
        <EditDistribution releaseData={releaseData} />
      </Route>
      <Route path={path} exact>
        <Stack flex={1} bg="#eee" align="center" direction="column">
          <Stack mb={4} spacing={4} width="90%" maxW={'900px'}>
            <HeaderSection releaseData={releaseData} />
            <Summary releaseData={releaseData} />
            <Artwork releaseData={releaseData} />
            <Distribution releaseData={releaseData} />
            <Events releaseData={releaseData} />
          </Stack>
        </Stack>
      </Route>
    </Switch>
  );
};

export default SpecificRelease;
