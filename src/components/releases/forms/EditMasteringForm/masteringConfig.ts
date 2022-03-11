import { baseTaskConfig } from '../baseTaskConfig';

import { FormDatum } from 'types/forms';
import { EditMasteringFormData } from 'components/releases/specific/tasks/Mastering/types';

export const buildMasteringConfig = (
  releaseDate: Date | null
): FormDatum<EditMasteringFormData>[] => [...baseTaskConfig(releaseDate)];
