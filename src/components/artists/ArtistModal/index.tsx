import { Modal, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import React from 'react';

import ArtistForm from '../ArtistForm';

import { ArtistResponse } from 'types/common';

type Props = Omit<ModalProps, 'children'> & { artist: ArtistResponse };

const ArtistModal = ({ artist, onClose, ...rest }: Props) => {
  return (
    <Modal onClose={onClose} size="xl" {...rest}>
      <ModalOverlay />
      <ModalContent w="90%">
        <ArtistForm existingArtist={artist} onSubmitSuccess={() => onClose()} />
      </ModalContent>
    </Modal>
  );
};

export default ArtistModal;
