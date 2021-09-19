import { Heading, Stack, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import next from 'next';

import EditDistributionFormBody from '../specific/Distribution/EditDistributionForm/EditDistributionFormBody';
import BasicInfoFormBody from '../NewReleaseForm/BasicInfoFormBody';
import EditArtworkFormBody from '../specific/Artwork/EditArtworkForm/EditArtworkFormBody';
import { BasicInfoFormData } from '../NewReleaseForm/types';
import { EditArtworkFormData } from '../specific/Artwork/types';
import { EditDistributionFormData } from '../specific/Distribution/types';
import WizardArtworkFormBody from '../specific/Artwork/WizardArtworkForm/WizardArtworkFormBody';

import useAppColors from 'hooks/useAppColors';
import { useSteps } from 'hooks/useSteps';
import WizardSteps from 'components/WizardSteps';
import Card from 'components/Card';

interface Props {}

interface CombinedFormState {
  basics?: BasicInfoFormData;
  artwork?: EditArtworkFormData;
  distribution?: EditDistributionFormData;
}

type FormKey = 'basics' | 'artwork' | 'distribution' | 'review';

const buildSteps = () => [
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
  const { currentStep, getState, next, previous } = useSteps(steps);

  const [allState, setAllState] = useState<CombinedFormState>({});

  console.log(allState);

  const onSubmit = (
    key: 'basics' | 'artwork' | 'distribution' | 'review',
    data: BasicInfoFormData | EditArtworkFormData | EditDistributionFormData
  ) => {
    setAllState({ ...allState, [key]: data });
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
        <Text>Enter info about your new release.</Text>
        <WizardSteps
          steps={steps}
          getState={getState}
          currentStep={currentStep}
        ></WizardSteps>
        <Card>
          <Stack>
            <Heading size="lg">{activeItem.name}</Heading>
            <StepComponent
              isSkippable={activeItem.isSkippable}
              onSkip={activeItem.isSkippable ? () => next() : undefined}
              onSubmit={(data) => onSubmit(activeItem.key as FormKey, data)}
              canGoBack={activeItem.canGoBack}
              onBack={activeItem.canGoBack ? () => previous() : undefined}
            />
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};

export default NewReleaseWizard;
