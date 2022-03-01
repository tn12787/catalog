import { Modal, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import React from 'react';

type Props = Omit<ModalProps, 'children'>;

const ManageLabelsModal = ({ onClose, ...rest }: Props) => {
  return (
    <Modal size="lg" onClose={onClose} {...rest}>
      <ModalOverlay />

      <ModalContent w="90%">Manage labels</ModalContent>
    </Modal>
  );
};

export default ManageLabelsModal;
