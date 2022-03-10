import React from 'react';
import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { SummaryField } from '../../Summary';
import ReleaseTaskCard from '../ReleaseTaskCard';
import { defaultFields } from '../ReleaseTaskCard/defaultFields';

import EditMasteringForm from 'components/releases/forms/EditMasteringForm';
import { ClientRelease, EventType } from 'types/common';

interface Props {
  releaseData: ClientRelease;
}

const buildFields = (masteringInfo: ClientRelease['mastering'] | undefined): SummaryField[] => {
  return [...defaultFields(masteringInfo)].filter(Boolean) as SummaryField[];
};

const Mastering = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const masteringInfo = releaseData.mastering;
  return (
    <>
      <ReleaseTaskCard
        heading={'🎚️ Mastering'}
        onEditClick={onOpen}
        fields={buildFields(masteringInfo)}
        taskType={EventType.MASTERING}
        data={masteringInfo}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditMasteringForm releaseData={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Mastering;
