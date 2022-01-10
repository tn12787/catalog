export const transformAssigneesToPrismaQuery = (assignees: string[] | undefined, isNew = false) => {
  return assignees
    ? {
        [isNew ? 'connect' : 'set']: assignees.map((id) => ({
          id,
        })),
      }
    : undefined;
};
