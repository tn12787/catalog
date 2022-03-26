import { Modal, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { SummaryField } from '../../Summary';
import ReleaseTaskCard from '../ReleaseTaskCard';
import { defaultFields } from '../ReleaseTaskCard/defaultFields';

import { ClientRelease, EnrichedWorkspace, EventType } from 'types/common';
import EditDistributionForm from 'components/releases/forms/EditDistributionForm';
import useAppColors from 'hooks/useAppColors';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

interface Props {
  releaseData: ClientRelease;
}

const buildFields = (
  distributionTask: ClientRelease['distribution'] | undefined,
  workspace?: EnrichedWorkspace
): SummaryField[] => {
  return [
    ...defaultFields(distributionTask, workspace),
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
  const { workspace } = useCurrentWorkspace();

  return (
    <>
      <ReleaseTaskCard
        heading={'💿 Distribution'}
        onEditClick={onOpen}
        fields={buildFields(distributionTask, workspace)}
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
