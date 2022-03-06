import React from 'react';
import {
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  Input,
  Box,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Workspace } from '@prisma/client';

import useAppColors from 'hooks/useAppColors';
import PageHead from 'components/pageItems/PageHead';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import logo from 'images/logo.svg';
import onboarding from 'images/onboarding.svg';
import WizardSteps from 'components/forms/WizardSteps';
import { useSteps } from 'hooks/useSteps';
import { OnboardingWizardStep } from 'components/onboarding/types';
import useWorkspaceMutations from 'hooks/data/workspaces/useWorkspaceMutations';

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
  const { bgPrimary } = useAppColors();
  const { workspace } = useCurrentWorkspace();
  const steps = buildSteps();
  const { index, next } = useSteps<OnboardingWizardStep>(steps);

  const { updateSingleWorkspace } = useWorkspaceMutations();

  const onSave = async (data: Pick<Workspace, 'name'>) => {
    try {
      await updateSingleWorkspace.mutateAsync({ id: workspace?.id as string, ...data });
      next();
    } catch (error) {
      console.error(error);
    }
  };

  const { register, handleSubmit } = useForm<Pick<Workspace, 'name'>>();

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
          <Stack spacing={6} as="form" onSubmit={handleSubmit(onSave)}>
            <Heading fontWeight="semibold" fontSize="5xl">
              Welcome to Launchday!
            </Heading>
            <Text>{"First, let's name your new workspace."}</Text>
            <FormControl>
              <FormLabel htmlFor="name">Workspace name</FormLabel>
              <Input
                placeholder={'Your new workspace name'}
                maxW="400px"
                defaultValue={workspace?.name}
                {...register('name', { required: 'Please enter a name for your workspace' })}
              ></Input>
            </FormControl>
            <Button
              type="submit"
              isLoading={updateSingleWorkspace.isLoading}
              variant="solid"
              alignSelf={'flex-start'}
              rightIcon={<FaArrowRight />}
              colorScheme={'purple'}
            >
              Next
            </Button>
          </Stack>
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
