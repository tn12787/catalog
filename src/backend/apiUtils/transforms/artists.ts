export const transformArtistToPrismaQuery = (artist: string | undefined) => {
  return artist
    ? {
        connect: {
          id: artist,
        },
      }
    : undefined;
};
