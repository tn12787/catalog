import React from 'react';
import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { SummaryField } from '../../Summary';
import ReleaseTaskCard from '../ReleaseTaskCard';
import { defaultFields } from '../ReleaseTaskCard/defaultFields';

import EditMasteringForm from 'components/releases/forms/EditMasteringForm';
import { ClientRelease, EnrichedWorkspace, EventType } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

interface Props {
  releaseData: ClientRelease;
}

const buildFields = (
  masteringInfo: ClientRelease['mastering'] | undefined,
  workspace?: EnrichedWorkspace
): SummaryField[] => {
  return [...defaultFields(masteringInfo, workspace)].filter(Boolean) as SummaryField[];
};

const Mastering = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgSecondary } = useAppColors();
  const masteringInfo = releaseData.mastering;
  const { workspace } = useCurrentWorkspace();
  return (
    <>
      <ReleaseTaskCard
        heading={'🎚️ Mastering'}
        onEditClick={onOpen}
        fields={buildFields(masteringInfo, workspace)}
        taskType={EventType.MASTERING}
        data={masteringInfo}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent bg={bgSecondary}>
          <EditMasteringForm releaseData={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Mastering;
