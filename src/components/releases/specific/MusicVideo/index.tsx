import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { SummaryField } from '../Summary';
import ReleaseTaskCard from '../ReleaseTaskCard';
import { defaultFields } from '../ReleaseTaskCard/defaultFields';

import EditMusicVideoForm from 'components/releases/forms/EditMusicVideoForm';
import { ClientRelease, EventType } from 'types/common';

interface Props {
  releaseData: ClientRelease;
}

const buildFields = (musicVideoInfo: ClientRelease['musicVideo'] | undefined): SummaryField[] => {
  return [...defaultFields(musicVideoInfo)];
};

const MusicVideo = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const musicVideoInfo = releaseData.musicVideo;
  return (
    <>
      <ReleaseTaskCard
        heading={'🎥 Music Video '}
        onEditClick={onOpen}
        fields={buildFields(musicVideoInfo)}
        taskType={EventType.MUSIC_VIDEO}
        data={musicVideoInfo}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <EditMusicVideoForm releaseData={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default MusicVideo;
