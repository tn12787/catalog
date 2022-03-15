import { Modal, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import React from 'react';

import EditContactLabelForm from '../forms/EditContactLabelForm';

import { ContactLabelWithContacts } from 'types/common';
import useAppColors from 'hooks/useAppColors';

type Props = Omit<ModalProps, 'children'> & { label?: ContactLabelWithContacts };

const ContactLabelModal = ({ label, onClose, ...rest }: Props) => {
  const { bgSecondary } = useAppColors();
  return (
    <Modal onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent bg={bgSecondary} w="90%">
        <EditContactLabelForm label={label} onSubmitSuccess={() => onClose()} />
      </ModalContent>
    </Modal>
  );
};

export default ContactLabelModal;
