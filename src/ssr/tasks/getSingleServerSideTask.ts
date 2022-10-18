import { GetServerSideProps } from 'next';

import type { AuthDecoratedRequest } from 'types/auth';
import { getTaskByIdIsomorphic } from 'backend/isomorphic/tasks';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';

export const getSingleServerSideTask: GetServerSideProps = async (ctx) => {
  const res = await getServerSideSessionOrRedirect(ctx);

  if ((res as any).redirect) return res;

  const taskId = ctx.query['id'] as string;
  try {
    const task = await getTaskByIdIsomorphic(ctx.req as AuthDecoratedRequest, taskId);
    return {
      props: {
        ...(res as any).props,
        task: JSON.parse(JSON.stringify(task)), // TODO: HORRIBLE HACK pls fix
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
