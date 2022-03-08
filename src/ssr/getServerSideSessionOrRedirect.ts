import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

type ServerSideSessionReturn = { session: Session };

export const getServerSideSessionOrRedirect: GetServerSideProps<ServerSideSessionReturn> = async (
  context
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: `/login?callbackUrl=${context.req.url as string}&error=SessionRequired`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
