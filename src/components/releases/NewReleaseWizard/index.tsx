import { Heading, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import next from 'next';

import EditDistributionFormBody from '../specific/Distribution/EditDistributionForm/EditDistributionFormBody';
import BasicInfoFormBody from '../NewReleaseForm/BasicInfoFormBody';
import EditArtworkFormBody from '../specific/Artwork/EditArtworkForm/EditArtworkFormBody';
import { BasicInfoFormData } from '../NewReleaseForm/types';
import { EditArtworkFormData } from '../specific/Artwork/types';
import { EditDistributionFormData } from '../specific/Distribution/types';

import useAppColors from 'hooks/useAppColors';
import { useSteps } from 'hooks/useSteps';
import WizardSteps from 'components/WizardSteps';

interface Props {}

const buildSteps = () => [
  {
    name: 'Basics',
    content: BasicInfoFormBody,
  },
  {
    name: 'Artwork',
    isSkippable: true,
    content: EditArtworkFormBody,
  },
  {
    name: 'Distribution',
    isSkippable: true,
    content: EditDistributionFormBody,
  },
  {
    name: 'Review',
    content: EditDistributionFormBody,
  },
];

const NewReleaseWizard = (props: Props) => {
  const steps = buildSteps();
  const { currentStep, getState, next } = useSteps(steps);

  const onSubmit = (
    data: BasicInfoFormData | EditArtworkFormData | EditDistributionFormData
  ) => {
    next();
  };

  const activeItem = steps[currentStep];
  const { bgPrimary } = useAppColors();
  const StepComponent = activeItem.content;

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
        <Text>
          Enter info about your new release. You can optionally add info about
          artwork
        </Text>
        <WizardSteps
          steps={steps}
          getState={getState}
          currentStep={currentStep}
        ></WizardSteps>
        <Stack>
          <StepComponent
            isSkippable={activeItem.isSkippable}
            onSkip={activeItem.isSkippable ? () => next() : undefined}
            onSubmit={onSubmit}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NewReleaseWizard;
