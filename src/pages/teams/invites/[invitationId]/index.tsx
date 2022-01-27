import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { Flex, Heading, Spinner, Stack } from '@chakra-ui/react';

import { acceptInvite } from 'queries/invitations';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/PageHead';

const AcceptInvitationPage = () => {
  const router = useRouter();
  const { mutateAsync: acceptInvitation, isLoading, isError } = useMutation(acceptInvite);

  const attemptInviteAcceptance = async (id: string) => {
    if (!router.query) return;

    try {
      await acceptInvitation(id);
    } catch (e) {
      alert('error');
      console.error(e);
    }
  };

  useEffect(() => {
    if (!router.query) return;

    attemptInviteAcceptance(router.query.invitationId as string);
  });

  return (
    <Flex direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Sign in" />
      <Stack w={'80%'} maxW="400px" spacing={'40px'} alignItems="center">
        {isLoading ? (
          <Spinner size={'xl'} />
        ) : (
          <Heading>{isError ? 'Something went wrong' : 'Boiii'}</Heading>
        )}
      </Stack>
    </Flex>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

export default AcceptInvitationPage;
