import React from 'react';
import { Prisma, TaskEventType } from '@prisma/client';

import UpdateStatusItem from '../UpdateStatusItem';
import CreateTaskItem from '../CreateTaskItem';
import UpdateDateItem from '../UpdateDateItem';
import UpdateAssigneesItem from '../UpdateAssigneesItem';
import CommentItem from '../CommentItem';
import DeleteCommentItem from '../DeleteCommentItem';
import UpdateNameItem from '../UpdateNameItem';

import { ReleaseTaskEventWithUser } from 'types/common';

interface Props {
  event: ReleaseTaskEventWithUser;
  allEvents: ReleaseTaskEventWithUser[];
}

const getUpdatesForComment = (
  event: ReleaseTaskEventWithUser,
  allEvents: ReleaseTaskEventWithUser[]
) => {
  return allEvents?.filter((item) => {
    if (item.type !== TaskEventType.UPDATE_COMMENT) {
      return false;
    }
    const { commentId } = item.extraData as Prisma.JsonObject;
    return commentId === event.id;
  });
};

const ActivityListItem = ({ event, allEvents }: Props) => {
  switch (event.type) {
    case TaskEventType.UPDATE_STATUS:
      return <UpdateStatusItem event={event} />;
    case TaskEventType.UPDATE_ASSIGNEES:
      return <UpdateAssigneesItem event={event} />;
    case TaskEventType.UPDATE_DATE:
      return <UpdateDateItem event={event} />;
    case TaskEventType.UPDATE_NAME:
      return <UpdateNameItem event={event} />;
    case TaskEventType.CREATE_TASK:
      return <CreateTaskItem event={event} />;
    case TaskEventType.NEW_COMMENT:
      return <CommentItem updates={getUpdatesForComment(event, allEvents)} event={event} />;
    case TaskEventType.DELETE_COMMENT:
      return <DeleteCommentItem event={event} />;
    case TaskEventType.UPDATE_COMMENT:
      return null;
    default:
      return <p>{JSON.stringify(event)}</p>;
  }
};

export default ActivityListItem;
