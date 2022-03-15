import { ReleaseTaskWithAssignees } from 'types/common';

export type TaskFormData = Omit<ReleaseTaskWithAssignees, 'name'> & {
  name: {
    text: string;
    emoji: string;
  };
};
