import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  ModalProps,
  ModalBody,
} from '@chakra-ui/react';
import React from 'react';

import ArtistForm from '../ArtistForm';

import { ArtistResponse } from 'types/common';
import useAppColors from 'hooks/useAppColors';

type Props = Omit<ModalProps, 'children'> & { artist: ArtistResponse };

const ArtistModal = ({ artist, onClose, ...rest }: Props) => {
  const { bgSecondary } = useAppColors();
  return (
    <Modal closeOnOverlayClick={false} onClose={onClose} size="5xl" {...rest}>
      <ModalOverlay />
      <ModalContent bg={bgSecondary} w="90%">
        <ModalHeader>Edit {artist.name}</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <Text>Update info about this artist.</Text>
          <ArtistForm existingArtist={artist} onSubmitSuccess={() => onClose()} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ArtistModal;
