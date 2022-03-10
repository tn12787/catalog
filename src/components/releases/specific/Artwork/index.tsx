import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { SummaryField } from '../Summary';
import EditArtworkForm from '../../forms/EditArtworkForm';
import ReleaseTaskCard from '../ReleaseTaskCard';
import { defaultFields } from '../ReleaseTaskCard/defaultFields';

import { ClientRelease, EventType } from 'types/common';

interface Props {
  releaseData: ClientRelease;
}

const buildFields = (artworkTask: ClientRelease['artwork'] | undefined): SummaryField[] => {
  return [...defaultFields(artworkTask)].filter(Boolean) as SummaryField[];
};

const Artwork = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const artworkTask = releaseData.artwork;
  return (
    <>
      <ReleaseTaskCard
        heading={'🎨 Artwork '}
        onEditClick={onOpen}
        fields={buildFields(artworkTask)}
        taskType={EventType.ARTWORK}
        data={artworkTask}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditArtworkForm releaseData={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Artwork;
