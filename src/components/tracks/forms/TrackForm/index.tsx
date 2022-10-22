import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';

import LinkTracksForm from './LinkTracksForm';
import CreateTrackForm from './CreateTrackForm';

import { ClientRelease } from 'types/common';

type Props = {
  releaseData: ClientRelease;
  onSubmitSuccess: () => void;
};

const TrackForm = ({ releaseData, onSubmitSuccess }: Props) => {
  return (
    <Stack spacing={5}>
      <Tabs colorScheme="purple">
        <TabList>
          <Tab>Create new Track</Tab>
          <Tab>Link Existing Tracks</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <CreateTrackForm
              releaseData={releaseData}
              onSubmitSuccess={onSubmitSuccess}
            ></CreateTrackForm>
          </TabPanel>
          <TabPanel p={0}>
            <LinkTracksForm
              releaseData={releaseData}
              onSubmitSuccess={onSubmitSuccess}
            ></LinkTracksForm>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default TrackForm;
