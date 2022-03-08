import { GetServerSideProps } from 'next';

import { getReleaseByIdIsomorphic } from 'backend/isomorphic/releases';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import { AuthDecoratedRequest } from 'types/common';

export const getSingleServerSideRelease: GetServerSideProps = async (ctx) => {
  const res = await getServerSideSessionOrRedirect(ctx);

  if ((res as any).redirect) return res;

  const releaseId = ctx.query['id'] as string;
  try {
    const release = await getReleaseByIdIsomorphic(ctx.req as AuthDecoratedRequest, releaseId);
    return {
      props: {
        ...(res as any).props,
        release: JSON.parse(JSON.stringify(release)), // TODO: HORRIBLE HACK pls fix
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};
