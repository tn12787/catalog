import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Flex, Spinner, Stack, useToast } from '@chakra-ui/react';

import { acceptInvite } from 'queries/invitations';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/PageHead';
import useExtendedSession from 'hooks/useExtendedSession';
import InvalidInvitation from 'components/invitations/InvalidInvitation';
import AcceptedInvitation from 'components/invitations/AcceptedInvitation';
import useAppColors from 'hooks/useAppColors';

const AcceptInvitationPage = () => {
  const router = useRouter();
  const [hasStartedCheck, setHasStartedCheck] = useState(false);
  const { mutateAsync: acceptInvitation, isLoading, isError } = useMutation(acceptInvite);
  const toast = useToast();
  const { primary } = useAppColors();

  const { onChangeTeam } = useExtendedSession();

  const attemptInviteAcceptance = useCallback(
    async (id: string) => {
      if (!router.query) return;

      try {
        const data = await acceptInvitation(id);
        toast({ title: 'Invitation accepted!', status: 'success' });
        onChangeTeam(data.teamId);
      } catch (e) {
        console.error(e);
      }
    },
    [onChangeTeam, router, toast, acceptInvitation]
  );

  useEffect(() => {
    if (!router.query) return;

    setHasStartedCheck(true);
    attemptInviteAcceptance(router.query.invitationId as string);
  }, [router.query.invitationId, attemptInviteAcceptance, router.query]);

  return (
    <Flex direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Invitation to Team" />
      <Stack w={'80%'} maxW="400px" spacing={'40px'} alignItems="center">
        {isLoading || !hasStartedCheck ? (
          <Spinner color={primary} thickness="4px" size={'xl'} speed="0.8s" />
        ) : isError ? (
          <InvalidInvitation />
        ) : (
          <AcceptedInvitation />
        )}
      </Stack>
    </Flex>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

export default AcceptInvitationPage;
