import { Modal, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { SummaryField } from '../../Summary';
import ReleaseTaskCard from '../ReleaseTaskCard';
import { defaultFields } from '../ReleaseTaskCard/defaultFields';

import { ClientRelease, EventType } from 'types/common';
import EditDistributionForm from 'components/releases/forms/EditDistributionForm';
import useAppColors from 'hooks/useAppColors';

interface Props {
  releaseData: ClientRelease;
}

const buildFields = (
  distributionTask: ClientRelease['distribution'] | undefined
): SummaryField[] => {
  return [
    ...defaultFields(distributionTask),
    {
      name: 'Distributor',
      content: <Text fontSize="sm">{distributionTask?.distributor?.name}</Text>,
    },
  ];
};

const Distribution = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const distributionTask = releaseData.distribution;
  const { bgSecondary } = useAppColors();

  return (
    <>
      <ReleaseTaskCard
        heading={'💿 Distribution'}
        onEditClick={onOpen}
        fields={buildFields(distributionTask)}
        taskType={EventType.DISTRIBUTION}
        data={distributionTask}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent bg={bgSecondary}>
          <EditDistributionForm releaseData={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Distribution;
