import { Heading, Stack, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { pickBy } from 'lodash';
import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';

import EditDistributionFormBody from '../specific/Distribution/EditDistributionForm/EditDistributionFormBody';
import BasicInfoFormBody from '../NewReleaseForm/BasicInfoFormBody';
import { BasicInfoFormData } from '../NewReleaseForm/types';
import { EditArtworkFormData } from '../specific/Artwork/types';
import { EditDistributionFormData } from '../specific/Distribution/types';
import WizardArtworkFormBody from '../specific/Artwork/WizardArtworkForm/WizardArtworkFormBody';

import {
  CombinedFormState,
  ReleaseWizardKey,
  ReleaseWizardStep,
} from './types';

import useAppColors from 'hooks/useAppColors';
import { useSteps } from 'hooks/useSteps';
import WizardSteps from 'components/WizardSteps';
import Card from 'components/Card';
import { createSingleRelease } from 'queries/releases';
import useExtendedSession from 'hooks/useExtendedSession';
import { CreateSingleReleaseVars } from 'queries/releases/types';

interface Props {}

const buildSteps = (): ReleaseWizardStep[] => [
  {
    name: 'Basics',
    key: 'basics',
    content: BasicInfoFormBody,
  },
  {
    name: 'Artwork',
    isSkippable: true,
    canGoBack: true,
    key: 'artwork',
    content: WizardArtworkFormBody,
  },
  {
    name: 'Distribution',
    isSkippable: true,
    canGoBack: true,
    key: 'distribution',
    content: EditDistributionFormBody,
  },
  {
    name: 'Review',
    canGoBack: true,
    key: 'review',
    content: EditDistributionFormBody,
  },
];

const NewReleaseWizard = (props: Props) => {
  const steps = buildSteps();
  const { index, currentStep, next, previous } =
    useSteps<ReleaseWizardStep>(steps);

  const [allState, setAllState] = useState<CombinedFormState>({});
  const { currentTeam } = useExtendedSession();
  const queryClient = useQueryClient();
  const { mutateAsync: createRelease, isLoading: createLoading } = useMutation(
    createSingleRelease,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentTeam]);
      },
    }
  );

  const toast = useToast();
  const router = useRouter();

  const submitNewRelease = async (data: CombinedFormState) => {
    try {
      const result = await createRelease({
        ...data.basics,
        artwork: data.artwork,
        distribution: data.distribution,
        team: currentTeam,
      } as CreateSingleReleaseVars);
      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/releases/${result?.id}`);
    } catch (e: any) {
      toast({
        status: 'error',
        title: 'Oh no...',
        description: e.toString(),
      });
    }
  };

  const onSubmit = async (
    key: 'basics' | 'artwork' | 'distribution' | 'review',
    data: BasicInfoFormData | EditArtworkFormData | EditDistributionFormData
  ) => {
    if (key === 'review') {
      submitNewRelease(allState);
    } else {
      setAllState({ ...allState, [key]: data });
      next();
    }
  };

  const onSkip = (key: ReleaseWizardKey) => {
    setAllState((state) => {
      return pickBy({ ...state, [key]: undefined }, (val) => val !== undefined);
    });
  };

  const { bgPrimary } = useAppColors();
  const StepComponent = currentStep.content;

  return (
    <Stack
      bg={bgPrimary}
      flex={1}
      align="center"
      direction="column"
      width="100%"
      height="100%"
    >
      <Stack py={8} spacing={'20px'} width="90%" maxW="container.lg">
        <Heading alignSelf="flex-start">New Release</Heading>
        <Text>Enter info about your new release.</Text>
        <WizardSteps steps={steps} currentStep={index}></WizardSteps>
        <Card>
          <Stack>
            <Heading size="lg">{currentStep.name}</Heading>
            <StepComponent
              completeState={allState}
              isSkippable={currentStep.isSkippable}
              onSkip={
                currentStep.isSkippable
                  ? (stepKey: ReleaseWizardKey) => {
                      onSkip(stepKey);
                      next();
                    }
                  : undefined
              }
              onSubmit={(data) =>
                onSubmit(currentStep.key as ReleaseWizardKey, data)
              }
              canGoBack={currentStep.canGoBack}
              onBack={currentStep.canGoBack ? () => previous() : undefined}
            />
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};

export default NewReleaseWizard;
