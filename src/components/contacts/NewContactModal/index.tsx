import { Modal, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import React from 'react';

import EditContactForm from '../forms/EditContactForm';

type Props = Omit<ModalProps, 'children'>;

const NewContactModal = ({ onClose, ...rest }: Props) => {
  return (
    <Modal onClose={onClose} {...rest}>
      <ModalOverlay />

      <ModalContent w="90%">
        <EditContactForm onSubmitSuccess={() => onClose()} />
      </ModalContent>
    </Modal>
  );
};

export default NewContactModal;
