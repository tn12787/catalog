import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { SummaryField } from '../../Summary';
import EditArtworkForm from '../../../forms/EditArtworkForm';
import ReleaseTaskCard from '../ReleaseTaskCard';
import { defaultFields } from '../ReleaseTaskCard/defaultFields';

import { ClientRelease, EnrichedWorkspace, EventType } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

interface Props {
  releaseData: ClientRelease;
}

const buildFields = (
  artworkTask: ClientRelease['artwork'] | undefined,
  workspace?: EnrichedWorkspace
): SummaryField[] => {
  return [...defaultFields(artworkTask, workspace)].filter(Boolean) as SummaryField[];
};

const Artwork = ({ releaseData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgSecondary } = useAppColors();
  const { workspace } = useCurrentWorkspace();

  const artworkTask = releaseData.artwork;
  return (
    <>
      <ReleaseTaskCard
        heading={'🎨 Artwork '}
        onEditClick={onOpen}
        fields={buildFields(artworkTask, workspace)}
        taskType={EventType.ARTWORK}
        data={artworkTask}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent bg={bgSecondary}>
          <EditArtworkForm releaseData={releaseData} onSubmitSuccess={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Artwork;
