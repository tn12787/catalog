import { EmojiValue } from './../../../forms/EmojiInput/types';

import { ReleaseTaskWithAssignees } from 'types/common';

export type TaskNameData = EmojiValue;

export type TaskFormData = Omit<ReleaseTaskWithAssignees, 'name'> & {
  name: TaskNameData;
};
