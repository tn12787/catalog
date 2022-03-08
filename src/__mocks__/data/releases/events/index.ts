import { testRelease } from '..';

import { EventType } from 'types/common';
import { ReleaseEvent } from 'types/common';
import { testClientReleaseTaskData } from '__mocks__/data/tasks';

export const testReleaseEvent = (extraFields: Partial<ReleaseEvent>): ReleaseEvent => {
  return {
    name: 'Test Release',
    type: EventType.ARTWORK,
    date: new Date().toString(),
    release: testRelease({}),
    data: testClientReleaseTaskData({}),
    ...extraFields,
  };
};
