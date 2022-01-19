import React from 'react';
import { TaskEventType } from '@prisma/client';

import UpdateStatusItem from '../UpdateStatusItem';
import CreateTaskItem from '../CreateTaskItem';
import UpdateDateItem from '../UpdateDateItem';
import UpdateAssigneesItem from '../UpdateAssigneesItem';
import CommentItem from '../CommentItem';
import DeleteCommentItem from '../DeleteCommentItem';

import { ReleaseTaskEventWithUser } from 'types';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const ActivityListItem = ({ event }: Props) => {
  switch (event.type) {
    case TaskEventType.UPDATE_STATUS:
      return <UpdateStatusItem event={event} />;
    case TaskEventType.UPDATE_ASSIGNEES:
      return <UpdateAssigneesItem event={event} />;
    case TaskEventType.UPDATE_DATE:
      return <UpdateDateItem event={event} />;
    case TaskEventType.CREATE_TASK:
      return <CreateTaskItem event={event} />;
    case TaskEventType.NEW_COMMENT:
      return <CommentItem event={event} />;
    case TaskEventType.DELETE_COMMENT:
      return <DeleteCommentItem event={event} />;
    default:
      return <p>{JSON.stringify(event)}</p>;
  }
};

export default ActivityListItem;
