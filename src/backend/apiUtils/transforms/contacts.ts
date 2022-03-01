export const transformContactsToPrismaQuery = (contacts: string[] | undefined, isNew = false) => {
  return contacts
    ? {
        [isNew ? 'connect' : 'set']: contacts.map((id) => ({
          id,
        })),
      }
    : undefined;
};
