import { Heading, Stack, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { pickBy } from 'lodash';
import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';

import EditDistributionFormBody from '../forms/EditDistributionForm/EditDistributionFormBody';
import NewReleaseFormBody from '../forms/NewReleaseForm/NewReleaseFormBody';
import { BasicInfoFormData } from '../forms/NewReleaseForm/types';
import { EditArtworkFormData } from '../specific/tasks/Artwork/types';
import { EditDistributionFormData } from '../specific/tasks/Distribution/types';
import WizardArtworkFormBody from '../forms/WizardArtworkForm/WizardArtworkFormBody';
import EditMasteringFormBody from '../forms/EditMasteringForm/EditMasteringFormBody';
import { EditMasteringFormData } from '../specific/tasks/Mastering/types';

import { CombinedFormState, ReleaseWizardKey, ReleaseWizardStep } from './types';
import ReviewData from './ReviewData';

import useAppColors from 'hooks/useAppColors';
import { useSteps } from 'hooks/useSteps';
import WizardSteps from 'components/forms/WizardSteps';
import Card from 'components/Card';
import { createSingleRelease } from 'queries/releases';
import useExtendedSession from 'hooks/useExtendedSession';
import { CreateSingleReleaseVars } from 'queries/releases/types';
import { midday } from 'utils/dates';
import PageTitle from 'components/pageItems/PageTitle';
import ga from 'analytics/ga';

const buildSteps = (): ReleaseWizardStep[] => [
  {
    name: 'Basics',
    key: 'basics',
    description: "First, let's capture all the basic info about the release.",
    content: NewReleaseFormBody,
  },
  {
    name: 'Mastering',
    isSkippable: true,
    canGoBack: true,
    key: 'mastering',
    description: 'Tracks need to be mastered before sending them off for distribution.',
    content: EditMasteringFormBody,
  },
  {
    name: 'Artwork',
    isSkippable: true,
    canGoBack: true,
    key: 'artwork',
    description: 'They also need album art, too.',
    content: WizardArtworkFormBody,
  },
  {
    name: 'Distribution',
    isSkippable: true,
    canGoBack: true,
    key: 'distribution',
    description: 'Enter details of the distribution for this release.',
    content: EditDistributionFormBody,
  },
  {
    name: 'Review',
    canGoBack: true,
    key: 'review',
    description: 'Ready to go? Check the details of the new release below.',
    content: ReviewData,
  },
];

const NewReleaseWizard = () => {
  const steps = buildSteps();
  const { index, currentStep, next, previous } = useSteps<ReleaseWizardStep>(steps);

  const [allState, setAllState] = useState<CombinedFormState>({} as CombinedFormState);
  const { currentWorkspace } = useExtendedSession();
  const queryClient = useQueryClient();
  const { mutateAsync: createRelease, isLoading: createLoading } = useMutation(
    createSingleRelease,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases']);
        ga.event({
          action: 'New release',
          params: {
            event_category: 'Releases',
            event_label: 'New release',
          },
        });
      },
    }
  );

  const toast = useToast();
  const router = useRouter();

  const submitNewRelease = async (data: CombinedFormState) => {
    try {
      const result = await createRelease({
        ...data.basics,
        targetDate: midday(data.basics.targetDate),
        mastering: data.mastering && {
          ...data.mastering,
          dueDate: midday(data.mastering.dueDate),
          assignees: data.mastering?.assignees?.map(({ id }) => id) ?? [],
        },
        artwork: data.artwork && {
          ...data.artwork,
          dueDate: midday(data.artwork.dueDate),
          assignees: data.artwork?.assignees?.map(({ id }) => id) ?? [],
        },
        distribution: data.distribution && {
          ...data.distribution,
          dueDate: midday(data.distribution.dueDate),
          assignees: data.distribution?.assignees?.map(({ id }) => id) ?? [],
        },
        workspace: currentWorkspace,
      } as CreateSingleReleaseVars);
      toast({
        status: 'success',
        title: 'Success',
        description: 'Release created successfully.',
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
    key: ReleaseWizardKey,
    data: BasicInfoFormData | EditArtworkFormData | EditDistributionFormData | EditMasteringFormData
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
      return pickBy(
        { ...state, [key]: undefined },
        (val) => val !== undefined
      ) as unknown as CombinedFormState;
    });
  };

  const { bgPrimary } = useAppColors();
  const StepComponent = currentStep.content;

  return (
    <Stack bg={bgPrimary} flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={'20px'} width="90%" maxW="container.lg">
        <PageTitle>New Release</PageTitle>
        <WizardSteps steps={steps} currentStep={index}></WizardSteps>
        <Card>
          <Stack py={6} maxW="600px" alignSelf={'center'} w="100%">
            <Heading size="lg">{currentStep.name}</Heading>
            <Text>{currentStep.description}</Text>
            <StepComponent
              completeState={allState}
              isSkippable={currentStep.isSkippable}
              loading={createLoading}
              onSkip={
                currentStep.isSkippable
                  ? (stepKey: ReleaseWizardKey) => {
                      onSkip(stepKey);
                      next();
                    }
                  : undefined
              }
              onSubmit={(data) => onSubmit(currentStep.key as ReleaseWizardKey, data)}
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
