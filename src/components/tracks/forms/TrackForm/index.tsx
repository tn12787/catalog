import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';

import CopyTracksForm from './CopyTracksForm';
import CreateEditTrackForm from './CreateEditTrackForm';

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
            <CreateEditTrackForm
              releaseData={releaseData}
              onSubmitSuccess={onSubmitSuccess}
            ></CreateEditTrackForm>
          </TabPanel>
          <TabPanel p={0}>
            <CopyTracksForm
              releaseData={releaseData}
              onSubmitSuccess={onSubmitSuccess}
            ></CopyTracksForm>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default TrackForm;
