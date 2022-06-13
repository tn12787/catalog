import React from 'react';
import { Alert, Button, Stack, Text } from '@chakra-ui/react';

import ArtistForm from '../ArtistForm';

import Card from 'components/Card';
import useAppColors from 'hooks/useAppColors';
import { FeatureKey } from 'common/features/types';
import { canAddAnotherArtist } from 'utils/artists';
import useArtists from 'hooks/data/artists/useArtists';
import useFeatures from 'hooks/features/useFeatures';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import PageTitle from 'components/pageItems/PageTitle';
import ga from 'analytics/ga';

const NewArtist = () => {
  const { bgPrimary } = useAppColors();
  const { data: artists } = useArtists({});
  const { isFeatureEnabled } = useFeatures();
  const { workspace, manageWorkspace } = useCurrentWorkspace();

  const needsMoreArtists =
    !canAddAnotherArtist(artists?.length ?? 0, workspace) && isFeatureEnabled(FeatureKey.PAYMENTS);

  const onSubmitSuccess = () => {
    ga.event({
      action: 'Artist created',
      params: { event_category: 'Artists', event_label: 'New Artist' },
    });
  };

  return (
    <Stack bg={bgPrimary} flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <PageTitle>Create a new Artist</PageTitle>
        <Text>Add basic info about the artist.</Text>
        {needsMoreArtists && (
          <Alert status={'warning'} variant="left-accent" py={2} rounded={'md'}>
            {"You can't add any more artists as there are none left in your plan."}
            <Button
              size="sm"
              ml={2}
              onClick={manageWorkspace}
              colorScheme={'black'}
              textDecoration="underline"
              variant="link"
            >
              Need more?
            </Button>
          </Alert>
        )}
        <Card width="100%">
          <ArtistForm isDisabled={needsMoreArtists} onSubmitSuccess={onSubmitSuccess} />
        </Card>
      </Stack>
    </Stack>
  );
};

export default NewArtist;
