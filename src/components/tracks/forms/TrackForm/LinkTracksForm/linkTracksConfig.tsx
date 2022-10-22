import { LinkTracksFormData } from './types';

import { FormDatum } from 'types/forms';
import ExistingTrackSelect from 'components/tracks/ExistingTrackSelect';

export const linkTracksConfig = (): FormDatum<LinkTracksFormData>[] => [
  {
    name: 'ids',
    label: 'Link Tracks',
    CustomComponent: ExistingTrackSelect,
  },
];
