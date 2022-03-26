import { baseTaskConfig } from '../baseTaskConfig';

import { FormDatum } from 'types/forms';
import { EditMasteringFormData } from 'components/releases/specific/tasks/Mastering/types';
import { EnrichedWorkspace } from 'types/common';

export const buildMasteringConfig = (
  releaseDate: Date | null,
  workspace?: EnrichedWorkspace
): FormDatum<EditMasteringFormData>[] => [...baseTaskConfig(releaseDate, workspace)];
