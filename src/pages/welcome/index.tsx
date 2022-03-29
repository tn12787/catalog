import React from 'react';
import { Flex, Stack, Box, Spinner, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { Invite } from '@prisma/client';

import useAppColors from 'hooks/useAppColors';
import PageHead from 'components/pageItems/PageHead';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import logo from 'images/logo.png';
import logo_dark from 'images/logo_dark.png';
import onboarding from 'images/onboarding.svg';
import WizardSteps from 'components/forms/WizardSteps';
import { useSteps } from 'hooks/useSteps';
import { OnboardingWizardStep } from 'components/onboarding/types';
import WorkspaceNameForm from 'components/onboarding/WorkspaceNameForm';
import InvitationForm from 'components/onboarding/InvitationForm';
import useInvitations from 'hooks/data/invitations/useInvitations';
import UserSegmentForm from 'components/onboarding/UserSegmentForm';
import UserInfoForm from 'components/onboarding/UserInfoForm';
import useUser from 'hooks/useUser';

const buildSteps = (invites: Invite[]): OnboardingWizardStep[] =>
  [
    {
      name: 'User Info',
      key: 'userInfo',
      content: UserInfoForm,
    },
    {
      name: 'Segment',
      key: 'segment',
      content: UserSegmentForm,
    },
    {
      name: 'Welcome',
      key: 'workspace',
      content: WorkspaceNameForm,
    },
    invites.length > 0 && {
      name: 'Invitation',
      key: 'invitation',
      content: InvitationForm,
    },
  ].filter(Boolean) as OnboardingWizardStep[];

const WelcomePage = () => {
  const { bgPrimary } = useAppColors();
  const { data: invitations, isLoading: areInvitationsLoading } = useInvitations();
  const { isLoading: isUserLoading } = useUser();
  const steps = buildSteps(invitations ?? []);
  const { index, next, currentStep } = useSteps<OnboardingWizardStep>(steps);
  const logoSrc = useColorModeValue(logo, logo_dark);

  const CurrentStepComponent = currentStep.content;

  const isAnythingLoading = areInvitationsLoading || isUserLoading;

  return (
    <Flex bg={bgPrimary} direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Home" />
      <Stack
        flex={1}
        height={'100%'}
        direction={{ base: 'column-reverse', lg: 'row' }}
        spacing={0}
        w="100%"
        justify={{ base: 'flex-end', lg: 'base' }}
      >
        <Stack
          justifyContent="center"
          w={{ base: '100%', lg: '40%' }}
          spacing={6}
          p={{ base: 8, lg: 20 }}
        >
          <Box w={20}>
            <Image src={logoSrc} alt="Brand logo"></Image>
          </Box>
          {isAnythingLoading ? (
            <Spinner colorScheme={'purple'} size="xl" time="1s"></Spinner>
          ) : (
            <Stack spacing={6}>
              <WizardSteps variant="bars" steps={steps} currentStep={index}></WizardSteps>
              <CurrentStepComponent onSubmit={next} isLastStep={index === steps.length - 1} />
            </Stack>
          )}
        </Stack>
        <Stack
          maxHeight={{ base: '100px', lg: '100vh' }}
          w={{ base: '100%', lg: '60%' }}
          spacing={6}
        >
          <Image objectFit="cover" src={onboarding} alt="onboarding"></Image>
        </Stack>
      </Stack>
    </Flex>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

export default WelcomePage;
