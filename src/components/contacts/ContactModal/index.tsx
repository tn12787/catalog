import { Modal, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import React from 'react';

import EditContactForm from '../forms/EditContactForm';

import { ContactWithLabels } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import ga from 'analytics/ga';

type Props = Omit<ModalProps, 'children'> & { contact?: ContactWithLabels };

const ContactModal = ({ contact, onClose, ...rest }: Props) => {
  const { bgSecondary } = useAppColors();

  const onSubmitSuccess = () => {
    if (!contact) {
      ga.event({
        action: 'Contact created',
        params: {
          event_category: 'Contacts',
          event_label: 'Contact created',
        },
      });
    }

    onClose();
  };

  return (
    <Modal onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent bg={bgSecondary} w="90%">
        <EditContactForm contact={contact} onSubmitSuccess={onSubmitSuccess} />
      </ModalContent>
    </Modal>
  );
};

export default ContactModal;
