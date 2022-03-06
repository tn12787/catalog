import React from 'react';
import { Button, Flex, Heading, Text, Stack, Input, Box } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

import useAppColors from 'hooks/useAppColors';
import PageHead from 'components/pageItems/PageHead';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import logo from 'images/logo.svg';
import onboarding from 'images/onboarding.svg';
import WizardSteps from 'components/forms/WizardSteps';
import { useSteps } from 'hooks/useSteps';
import { OnboardingWizardStep } from 'components/onboarding/types';

const buildSteps = (): OnboardingWizardStep[] => [
  {
    name: 'Welcome',
    key: 'workspace',
    content: () => <></>,
  },
  {
    name: 'Invitation',
    isSkippable: false,
    canGoBack: true,
    key: 'invitation',
    content: () => <></>,
  },
];

const WelcomePage = () => {
  const { bgPrimary, primary } = useAppColors();
  const { workspace } = useCurrentWorkspace();
  const steps = buildSteps();
  const { index, currentStep, next, previous } = useSteps<OnboardingWizardStep>(steps);
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
            <Image src={logo} alt="Brand logo"></Image>
          </Box>

          <WizardSteps variant="bars" steps={steps} currentStep={index}></WizardSteps>
          <Heading fontWeight="semibold" fontSize="5xl">
            Welcome to Launchday!
          </Heading>
          <Text>{"First, let's name your new workspace."}</Text>
          <Input maxW="400px" defaultValue={workspace?.name}></Input>
          <Button
            variant="solid"
            alignSelf={'flex-start'}
            rightIcon={<FaArrowRight />}
            colorScheme={'purple'}
          >
            Next
          </Button>
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
