import { ClientRelease, ReleaseTaskWithAssignees } from 'types/common';
export const clientReleaseTasks = (release?: ClientRelease) =>
  [release?.artwork, release?.distribution, release?.mastering, release?.musicVideo].filter(
    Boolean
  ) as ReleaseTaskWithAssignees[];

export const hasAllRequiredTasks = (release: ClientRelease) =>
  ['artwork', 'distribution', 'mastering'].every((item) => release.hasOwnProperty(item));
