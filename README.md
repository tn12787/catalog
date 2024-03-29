# catalog

A full-stack SaaS application for the music industry, to help individual artists and labels manage their releases.

Built with Next.JS, TypeScript, Prisma and PostgreSQL.

## Frontend

Docs to be completed.

## API

Docs to be completed.

## Data Model

At a glance, pretty comprehensive information can be found about the data model by inspecting the [Prisma schema]('./prisma/schema.prisma') for information about each data model.

### Limitations

Due to limitations in the Prisma schema, we cannot currently support polymorphic associations nor table inheritance in the data model. This means certain product concepts, like generic 'tasks' for releases, are currently implemented using a single table, with foreign keys for task-type-specific data. This wil likely change in a future version in-case Prisma supports polymorphic associations or table inheritance.

### JSON fields

Continuing on with the Prisma schema, we can see that the data model contains a few fields that are not natively supported by Prisma. These are JSON fields, which are stored as strings in the database, but are parsed into JSON objects when queried. Though we lose the DB's type system and type support in our Prisma schema, it is the only way we can scalably represent certain data shapes.

#### Activity on Release Tasks

When a release task is being completed, users will update the status of the task, they may write some notes, managers may comment, assignees may be updated, etc. As a key feature, we want to support differential data like in GitHub issues, where users can write notes, and managers can comment, but most importantly, we can see **what** changed, and **who** changed it, for each item of activity.

We can easily capture the type of activity occuring using a Prisma `enum`, but the data itself representing each change would have to be stored in separate tables with foreign keys in order to store it in the database. This is not great, and won't scale.

This is why the payloads for each activity are stored as JSON strings in the database. This allows us to store the data in a single table, and parse it when queried.

Here are the shape of the JSON payloads for each activity's extra data:

```ts
// TaskEventType.TASK_CREATED
extraData: {
}

// TaskEventType.NEW_COMMENT
extraData: {
  newComment: string; // The comment text as a Markdown string
}

// TaskEventType.UPDATE_COMMENT
extraData: {
  commentId: string; // The ID of the comment being updated
  newComment: string; // The new comment text as a Markdown string
}

// TaskEventType.DELETE_COMMENT
extraData: {
  user: string; // The user who commented originally
}

// TaskEventType.UPDATE_ASSIGNEES
extraData: {
  oldAssignees: string[]; // The IDs of the previous assignees
  newAssignees: string[]; // The IDs of the new assignees
}

// TaskEventType.UPDATE_STATUS
extraData: {
  oldStatus: TaskStatus; // The IDs of the previous assignees
  newStatus: TaskStatus; // The IDs of the new assignees
}

// TaskEventType.UPDATE_DATE
extraData: {
  oldDueDate: string // ISO timestamp of the previous date
  newDueDate: string // ISO timestamp of the new date
}

// TaskEventType.UPDATE_NAME
extraData: {
  oldName: string // ISO timestamp of the previous date
  newName: string // ISO timestamp of the new date
}
```

## Environments

Environment info is stored in a private gist, [here](https://gist.github.com/tn12787/617d97ef43857cc9db1792d8d39fce11).
