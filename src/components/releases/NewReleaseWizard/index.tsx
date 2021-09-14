import { Heading, Stack, Text } from '@chakra-ui/layout';
import React from 'react';

import NewReleaseForm from '../NewReleaseForm';
import BasicInfoFormBody from '../NewReleaseForm/BasicInfoFormBody';
import EditArtworkForm from '../specific/Artwork/EditArtworkForm';
import EditDistributionForm from '../specific/Distribution/EditDistributionForm';

import useAppColors from 'hooks/useAppColors';
import { useSteps } from 'hooks/useSteps';
import WizardSteps from 'components/WizardSteps';

interface Props {}

const steps = [
  {
    name: 'Basics',
    content: <BasicInfoFormBody />,
  },
  {
    name: 'Artwork',
    content: <EditArtworkForm />,
  },
  {
    name: 'Distribution',
    content: <EditDistributionForm />,
  },
  {
    name: 'Review',
    content: <EditDistributionForm />,
  },
];

const NewReleaseWizard = (props: Props) => {
  const { currentStep, getState } = useSteps(steps);

  const activeItem = steps[currentStep];
  const { bgPrimary } = useAppColors();

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
        <Text>Enter info about your new release. You can optionally add info about artwork</Text>
        <WizardSteps
          steps={steps}
          getState={getState}
          currentStep={currentStep}
        ></WizardSteps>
        {activeItem.content}
      </Stack>
    </Stack>
  );
};

export default NewReleaseWizard;
