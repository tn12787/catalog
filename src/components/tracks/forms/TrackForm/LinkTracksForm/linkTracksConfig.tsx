import { Track } from '@prisma/client';
import { Stack, Text } from '@chakra-ui/layout';

import { LinkTracksFormData } from './types';

import { FormDatum } from 'types/forms';
import ExistingTrackSelect from 'components/tracks/ExistingTrackSelect';

export const linkTracksConfig = (currentTracks?: Track[]): FormDatum<LinkTracksFormData>[] => [
  {
    name: 'ids',
    label: 'Link Tracks',
    CustomComponent: ExistingTrackSelect as any, //allow passing existing tracks
    extraProps: {
      existingTracks: currentTracks ?? [],
    },
    helperContent: (
      <Stack>
        <Text>
          {
            "You can add tracks you've already created in this workspace to a release. Tracks already added to this release won't show up in search."
          }
        </Text>
      </Stack>
    ),
  },
];
