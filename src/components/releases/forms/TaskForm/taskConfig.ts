import { baseTaskConfig } from '../baseTaskConfig';

import { TaskFormData } from './types';

import { EnrichedWorkspace } from 'types/common';
import { FormDatum } from 'types/forms';
import EmojiInput from 'components/forms/EmojiInput';

export const buildTaskConfig = (
  isGeneric: boolean,
  workspace?: EnrichedWorkspace
): FormDatum<TaskFormData>[] =>
  [
    isGeneric && {
      name: 'name',
      label: 'Task Name',
      helperContent: 'Protip: Prefix your task name with an emoji ✨ to make it easier to find.',
      extraProps: {
        placeholder: 'A name for your task.',
        maxLength: 200,
      },
      registerArgs: { required: 'Please enter a name for this task' },
      CustomComponent: EmojiInput,
    },
    ...baseTaskConfig(null, workspace),
  ].filter(Boolean) as FormDatum<TaskFormData>[];
