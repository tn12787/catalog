import { baseTaskConfig } from '../baseTaskConfig';

import { FormDatum } from 'types/forms';
import { ReleaseTaskWithAssignees } from 'types/common';

export const buildTaskConfig = (
  releaseDate: Date | null
): FormDatum<ReleaseTaskWithAssignees>[] => [
  {
    name: 'name',
    label: 'Name',
    registerArgs: {},
    helperContent: 'Protip: Prefix your task name with an emoji ✨ to make it easier to find.',
    extraProps: {
      placeholder: 'A name for your task.',
      maxLength: 200,
    },
  },
  ...baseTaskConfig(releaseDate),
];
