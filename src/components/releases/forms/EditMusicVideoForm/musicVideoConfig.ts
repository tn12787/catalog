import { baseTaskConfig } from '../baseTaskConfig';

import { FormDatum } from 'types/forms';
import { EditMusicVideoFormData } from 'components/releases/specific/tasks/MusicVideo/types';

export const buildMusicVideoConfig = (
  releaseDate: Date | null
): FormDatum<EditMusicVideoFormData>[] => [...baseTaskConfig(releaseDate)];
