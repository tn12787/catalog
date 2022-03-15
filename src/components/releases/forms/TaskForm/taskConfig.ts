import { baseTaskConfig } from '../baseTaskConfig';

import { FormDatum } from 'types/forms';
import { ReleaseTaskWithAssignees } from 'types/common';
import EmojiInput from 'components/forms/EmojiInput';

export const buildTaskConfig = (
  releaseDate: Date | null
): FormDatum<ReleaseTaskWithAssignees>[] => [
  {
    name: 'name',
    label: 'Task Name',
    registerArgs: {},
    helperContent: 'Protip: Prefix your task name with an emoji ✨ to make it easier to find.',
    extraProps: {
      placeholder: 'A name for your task.',
      maxLength: 200,
    },
    CustomComponent: EmojiInput,
  },
  ...baseTaskConfig(releaseDate),
];
