import { GetServerSideProps } from 'next';

import type { AuthDecoratedRequest } from 'types/auth';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import { getArtistByIdIsomorphic } from 'backend/isomorphic/artists';

export const getSingleServerSideArtist: GetServerSideProps = async (ctx) => {
  const res = await getServerSideSessionOrRedirect(ctx);

  if ((res as any).redirect) return res;

  const artistId = ctx.query['id'] as string;
  try {
    const artist = await getArtistByIdIsomorphic(ctx.req as AuthDecoratedRequest, artistId);
    return {
      props: {
        ...(res as any).props,
        artist: JSON.parse(JSON.stringify(artist)), // TODO: HORRIBLE HACK pls fix
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
