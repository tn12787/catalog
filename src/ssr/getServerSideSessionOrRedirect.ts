import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export const getServerSideSessionOrRedirect: GetServerSideProps = async (
  context
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
