import { GetServerSideProps } from 'next';

import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
import { AuthDecoratedRequest } from 'types/auth';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';

export const getSingleServerSideWorkspace: GetServerSideProps = async (ctx) => {
  const res = await getServerSideSessionOrRedirect(ctx);

  if ((res as any).redirect) return res;

  const workspaceId = ctx.query['id'] as string;
  try {
    const task = await getWorkspaceByIdIsomorphic(ctx.req as AuthDecoratedRequest, workspaceId);
    return {
      props: {
        ...(res as any).props,
        workspace: JSON.parse(JSON.stringify(task)), // TODO: HORRIBLE HACK pls fix
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
