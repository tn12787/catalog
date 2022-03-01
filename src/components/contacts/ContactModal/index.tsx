import { Modal, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import React from 'react';

import EditContactForm from '../forms/EditContactForm';

import { ContactWithLabels } from 'types/common';

type Props = Omit<ModalProps, 'children'> & { contact?: ContactWithLabels };

const ContactModal = ({ contact, onClose, ...rest }: Props) => {
  return (
    <Modal onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent w="90%">
        <EditContactForm contact={contact} onSubmitSuccess={() => onClose()} />
      </ModalContent>
    </Modal>
  );
};

export default ContactModal;
